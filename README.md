# Med Cabinet Back-end API Information

# API: https://marijuana-api.herokuapp.com/

## REGISTER AND LOGIN
Type | Endpoint | What it does | Required
-----|--------------------|----------------------|-------------------------------------------------
POST | /api/auth/register | registers a user     | requires a __username__ and password  
POST | /api/auth/login    | logs a user in       | requires a __username__ and __password__ returns an authorized token.  

#### The following endpoints will be behind the restricted middleware once authorized the following information will be accessible

## USERS
Type | Endpoint | What it does | Required
------------|--------------------------------|----------------------------------------------|--------------------------------
GET         | /api/users                     | returns a list of all users                  |  
GET         | /api/users/:id                 | returns a specific user by id                |  
PUT         | /api/users/:id                 | allows specific user to be edited            | makes changes to user object. Use for __bio__   
DELETE      | /api/users/:id                 | allws user to be delted                      |   
GET         | /api/users/:id/ailments        | returns a specific users ailments            |  
POST        | /api/users/:id/ailments        | allows user to add a new ailment             | requires __name__  __description__ and __user_id__  
PUT         | /api/users/:id/ailments/:ailment_id    | allows user to edit their ailments           | requires __name__  __description__ and __user_id__  
DELETE      | /api/users/:id/ailments/:ailment_id    | allows user to delete specific ailments      |  


## AILMENTS
Type | Endpoint | What it does | Required
-------|-------------------|-----------------------------------|------------------------------------------------------
GET    | /api/ailments     | returns a list of all ailments    |  
GET    | /aip/ailments/:id | returns a specific ailment by id  |  
POST   | /api/ailments/    | adds new ailments                 | requires __name__ and __description__ and __user_id__  
PUT    | /api/ailments/:id | updates specific ailment by id    |  
DELETE | /api/ailments/:id | deletes specific ailment by id    |     

## STRAINS
#### strains are available as public info --> not behind restricted middleware
Type | Endpoint | What it does | Required
-------|--------------------|-----------------------------------|------------------------------------------------
GET    | /api/strains       | returns a list of all strains     |  
GET    | /api/strains/:id   | returns a specific ailment by id  |  
POST   | /api/strains       | adds a new strain                 | requires __name__ __type__ and __description__  
DELETE | /api/strains/:id   | deletes a strain                  |  

## RECOMMENDATIONS
Type | Endpoint | What it does | Required
-----|---------------------------------------|----------------------------------|-------
GET | /api/recommendations/                  | returns all recommended options
GET | /api/recommendations/ailment/:id       | returns strains based on ailment id  
GET | /api/recommendations/strain/:id        | returns list of ailments that a specific strain is good for
