# FansFirst Season Ticket Holder Shared Seats Draft Tool

## WORKFLOW

- User creates a new draft by entering ticket details and number of participant and their name and email
- Application saves draft and participant details and sends participation emails to all users awaiting their confirmation
- Job1 keeps checking if all the participants of a draft have confirmed their participation
- When all participants have confirmed their participation, Job 1 automatically creates rounds and participant-round mapping based on Snake Draft algorithm
- Job 2 keeps looking when rounds for a draft are created. As soon as they are created, Job 2 starts sending out email for picking a game to user based on their ordinal number (order in which they will pick the game).
- Job 2 also keeps a check if a round is complete. Once complete, it will mark the status of a round to DONE and start a new round, repeating the same process.
- Once all the participants have picked the games, the status of the draft will be marked as ASSIGNED
- UI will continuously keep a track of participant activities and keep showing data to user based on different statuses of Participant confirmation, round status and pick status.


## JOBS

### Job 1 (Single Transaction)

- When all users of a draft are verified

- find out how many users for a draft (15)

- find out total number of games (45)

- total rounds = 45/15 = 3 rounds

- insert 3 rows in rounds table (NOT_STARTED)

- insert round_user_mapping rows (this is where your snake ladder logic comes in)

- draft status - VERIFICATION_COMPLETE



### Job 2 (Single Transaction)

- Get all drafts where status = VERIFICATION_COMPLETE

- Get all rounds of this draft (order of insertion - Round 1 -> Round 2 -> Round 3 etc)

- Start the first round - (status = STARTED)

- Email the first user from the round_user_mapping table

- Set the status of the draft = EMAILING


## REST contracts

### 1. getAllDrafts() - endpoint : http://< server IP >/getAllDrafts

- Request GET

- Response

```
{
	drafts : [
		{
			id : number
			ticketDetails : {
				row : number,
				section : string
			},
			participantCount : number
		}
	],
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null
}
```

### 2. createDraft() - endpoint : http://< server IP >/createDraft

- Request

```
{
	ticketDetails : {
		row : number,
		section : string
	},
	participantCount : number,
	participants : [
		{
			name : string,
			email : string
		}
	]

}
```

- Response

```
{
	id : number,			// draft id
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null
}
```

### 3. verifyEmail() - endpoint : http://< server IP >/verifyEmail

- Request

```
{
	id : number,			// id of the participant verifying email
	email : string			// email address of the participant verifying email
}

```

- Response

```
{
	id : number				// id of the draft for which person if verifying the email
	name : string,			// name of the participant
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null
}
```


### 4. checkDraftStatus() - endpoint : http://< server IP >/checkDraftStatus

- Request

```
{
	id : number			// draft id
}
```

- Response 

```
{
	id : number,				// draft id
	draftStatus : string,		// can only be 'VERIFYING', 'EMAILING' or 'ASSIGNED', defining 3 stages of the draft
	participants : [			// list of participants with email and pick details
		{
			name : string,			// name of the participant
			email : string,			// email of the participant
			verified : boolean,		// true if email is verified, false otherwise
			pick : {				// populated if the pick has been made by the participant (draft status = 'EMAILING' or 'ASSIGNED'), otherwise null
				id : number,			// pick number of the game
				name : string,			// name of the game
				date : string,			// date string of the game
				time : string			// time string of the game
			}
		}
	],
	countdown : {				// countdown information - only populated when status = 'EMAILING', otherwise null
		id : number,				// pick id of the game
		name : string,				// name of the participant on countdown
		timeRemaining : string		// time remaining before pick will be assigned automatically - hh:mm:ss
	},
	availableGames : [			// array of available games (total games minus ones which are already assigned to participants)
		{
			id : number,			// id of the game
			name : string,			// name of the game
			date : string,			// date string of the game - dd/MM/yyyy
			time : string			// time string of the game - 24 hours format
		}
	],
	status : boolean,			// if no error/exception occurred - true, otherwise false
	error : string  			// populate with error description only when status is false, otherwise always null
}
```

### 5. getAllGames() - endpoint : http://< server IP >/getAllGames

- Request GET

- Response

```
{
	games : [
		{
			id : number,		// id of the game
			name : string,		// name of the game
			date : string,		// date string of the game - dd/MM/yyyy
			time : string,		// time string of the game - 24 hours format
			ranking : number,	// ranking of the game
		}
	],
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null	
}
```


### 6. pick() - endpoint : http://< server IP >/pick

- Request

```
{
	id: 		number,			// user id
	gameId: 	number,			// id of the selected game
	roundId:	number,			// round id
	draftId:	number			// draft id
}

```

- Response

```
{
	id : number				// id of the draft
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null	
}
```


## Database Design


### 1. GAME

| ID 	|	NAME		|	DATE 					| Ranking |
|-------|---------------|---------------------------|---------|
|1		|	Montreal	|	Saturday 27th October	| 2		  |



### 2. DRAFT

| ID 	|	ROW		|	SECTION		|	STATUS (VERIFYING/VERIFICATION_COMPLETE/EMAILING/ASSIGNED) |
|-------|-----------|---------------|--------------------------------------------------------------|
|1		|	12		|	13A			|	EMAILING												   |



### 3. ROUND

|ID 	|	DRAFT_ID	|	STATUS (NOT_STARTED/STARTED/DONE)	|
|-------|---------------|---------------------------------------|
|1		|	1			|	DONE								|
|2		|	2			|	STARTED 							|



### 4. USER

|ID 	|	NAME		|	EMAIL 	|	IS_VERIFIED		|	DRAFT_ID 	|
|-------|---------------|-----------|-------------------|---------------|
|1		|	Vighnesh	|	v@gmail	|	true			|	1			|
|2		|	Akash		|	a@gmail	|	no				|	1			|



### 5. ROUND_USER_MAPPING

|ID 	|	PREFERENCE	|	USER_ID	|	DRAFT_ID	|	ROUND_ID	|	GAME_ID		|	STATUS (DEFAULT/EMAILED/PICKED)	|	START_DATE	|	END_DATE 	|
|-------|---------------|-----------|---------------|---------------|---------------|-----------------------------------|---------------|---------------|
|1		|	23			|	1		|	1			|	1			|	1			| 	PICKED							|	xxx			|	yyyy	 	|	
|2		|	34			|	2		|	1			|	1			|	null		|	EMAILED							|	ppp			|	qqq			|



