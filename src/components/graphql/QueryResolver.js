import gql from 'graphql-tag';

export const GET_SERVICES_BY_SUBCATEGORY=gql`query getServicesBySubcategory($subcategory: String!){

    getServicesBySubcategory(subcategory: $subcategory){
    id
    name
    userid
    username
    price
    completiontime
    description
    rating
    views
    extras1
    extras2
    extras1price
    extras2price
    extras1additionaltime
    extras2additionaltime
    imagepath1
    imagepath2
    imagepath3
    maincategory
    subcategory
    typeofdelivery
      }

}`;
export const GET_SERVICE_BY_ID=gql`query getService($id: ID!){
  getService(id: $id){
    id
    name
    userid
    username
    price
    completiontime
    description
    rating
    views
    extras1
    extras2
    extras1price
    extras2price
    extras1additionaltime
    extras2additionaltime
    imagepath1
    imagepath2
    imagepath3
    maincategory
    subcategory
    typeofdelivery
  }


}`;
export const GET_USER=gql`query getUser($id: ID!){
  getUser(id: $id){
    id
    firstname
    surname
    emailaddress
    username
    password
    profilepicturepath
    datejoined
    level
    skills
    country
    city
    bio
    balance
    gender
    dateofbirth
    newsletter
    usertype
    phonenumber
    plan
    active
    access
    responsetime
  }


}`;
export const GET_SERVICES_BY_USERID=gql`query getServicesByUserId($id: String!){
  getServicesByUserId(userid: $id){
    id
    name
    userid
    username
    price
    completiontime
    description
    rating
    views
    datelisted
    extras1
    extras2
    extras1price
    extras2price
    extras1additionaltime
    extras2additionaltime
    imagepath1
    imagepath2
    imagepath3
    maincategory
    subcategory
    typeofdelivery
  }


}`;
  export const GET_ORDERS_IN_QUEUE=gql`query getOrdersInQueue($userid: String, $completed: String){
  getOrdersInQueue(userid: $userid, completed: $completed){
    id
    serviceid
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
  }

}`;
export const USER_LOGIN=gql`query userLogin($username: String!, $password: String!){
  userLogin(username: $username, password: $password){
    id
    
  }
}`;
export const ALL_USERS=gql`query {
  allUsers{
    id
    firstname
    surname
    emailaddress
    username
    password
    profilepicturepath
    datejoined
    level
    skills
    country
    city
    bio
    balance
    gender
    dateofbirth
    newsletter
    usertype
    phonenumber
    plan
    active
    access
    responsetime
  }
}`;

export const ALL_SERVICES=gql`query {
  allServices{
    id
    name
    userid
    username
    price
    completiontime
    description
    rating
    views
    datelisted
    extras1
    extras2
    extras1price
    extras2price
    extras1additionaltime
    extras2additionaltime
    imagepath1
    imagepath2
    imagepath3
    maincategory
    subcategory
    typeofdelivery
  }
}`;

export const ALL_SERVICE_BIDS=gql`query {
  allServiceBids{
    id
    name
    userid
    payout
    expectedcompletiontime
    numberofbids
    description
    maincategory
    subcategory
    active
    datelisted
    expirationdate
    typeofdelivery
    bidimage
  }
}`;

export const GET_MESSAGES_BY_SENDER=gql`query getMessagesBySender(
  $sender: String
){
  getMessagesBySender(
    sender: $sender
  ){
    id
    sender
    receiver
    message
    date
    filepath1
    filepath2
    filepath3
    read
  }
}`;

export const GET_MESSAGES_BY_RECEIVER=gql`query getMessagesByReceiver(
  $receiver: String
  ){
  getMessagesByReceiver(receiver: $receiver){
    id
    sender
    receiver
    message
    date
    filepath1
    filepath2
    filepath3
    read
  }
}`;


