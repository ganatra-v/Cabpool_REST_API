# Cabpool_REST_API
This is the REST API to be used for the Cabpool App.

There various end points of the APIs and the fields they are to be called with are:

1. To create a new cabpool: @POST "/cabpools"
Fields in body:
{
  to:String,
  from:String,
  dateOfCabpool:String,
  time:String,
  userId:String,
  userName:String,
  phoneNumber:String
}
2. To fetch all cabpools: @GET "/cabpools"
3. To fetch a particular cabpool: @GET "/cabpools/:cabpoolId
4. To join a particular Cabpool : @PUT "/cabpools/join/:cabpoolId
Fields in body: 
{
  userId:String,
  userName:String,
  phoneNumber:String
}
5. To leave a particular Cabpool : @PUT "/cabpools/leave/:cabpoolId
Fields in body:
{
  userId:String
}
6. To delete a particular cabpool: @DELETE "/cabpools/:cabpoolId
7. To get the upcoming cabpools of a particular user: @GET "/cabpools/users/:userId

The bodies of all the APIs should be in JSON format.
