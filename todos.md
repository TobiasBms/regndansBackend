## Overview for tasks of the backend

### Server setup
 *[X] Setup some type of server
 *[X] Connect to database
### Folder Structure
 *[X] Find out what type of structure we should do
 *[X] files folder
### Models
 *[X] Create a validation method for google transit api

 *[ ] Create a Board entity that has a many to many relation to the user model.
 *[ ] Create a BoardRole Model
  * The **BoardRole** Should set it's fk on users so the relation is provided.
 *[ ] Create a Section Model. It should have the boards fk on since it's a many to one relation
  * The **Section** Should also have Helper and SectionType Id, but on creation you should create the other tables first.
 *[ ] Create a Helper Model 
 *[ ] Create a SectionType where the sectionType should be an enum instead of Varchar
   * The **SectionType** will have predefined types so use of Enum would a be good usecase here.
   * Some of the enums could be the [problem, idea, define etc..]
