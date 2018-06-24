# FansFirst Season Ticket Holder Shared Seats Draft Tool - REST Contracts

## 1. getAllDrafts() - endpoint : http://<IP>/getAllDrafts

### Request GET

### Response

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

## 2. createDraft() - endpoint : http://<IP>/createDraft

### Request

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

### Response

```
{
	id : number,			// draft id
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null
}
```

## 3. verifyEmail() - endpoint : http://<IP>/verifyEmail

### Request

```
{
	id : number,			// id of the participant verifying email
	email : string			// email address of the participant verifying email
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null
}

```

### Response

```
{
	id : number				// id of the draft for which person if verifying the email
	name : string,			// name of the participant
	status : boolean,		// if no error/exception occurred - true, otherwise false
	error : string  		// populate with error description only when status is false, otherwise always null
}
```


## 4. checkDraftStatus() - endpoint : http://<IP>/checkDraftStatus

### Request

```
{
	id : number			// draft id
}
```

### Response 

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

## 5. getAllGames() - endpoint : http://<IP>/getAllGames

### Request GET

### Response

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
