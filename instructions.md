## Context
Furever is a web based app to connect vets and customers who want to adopt and rehome pets, as well as appointment management.
Tech stack: MERN stack


## task: [removeVet](frontend/src/pages/admin/RemoveVet.jsx)
update this so that an admin can search for a vet by name. then, the admin may "deactivate" the vet. on requesting deactivation, check if the vet has any pending appointments (i.e. appointments with status "Pending" associated with the vet). if so, then display an error message saying that the vet cannot be removed due to his pending appointments. if there are no pending appointments, mark the vet as inactive. the vet should then not be displayed to the users but the admin can still see them. 


## CRITICIAL INSRUCTIONS
THE EXISTING FLOWS OTHER THAN THIS MUST BE UNAFFECTED , DO NOT BREAK ANYTHING.
make sure the colors, text, etc conforms to the existing designs. 
do not assume anything on your own, if you have any questions, ask me to clarify.
