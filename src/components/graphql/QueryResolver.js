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
  export const GET_ORDERS_IN_QUEUE=gql`query getOrdersInQueue($sellerid: String!, $completed: String!){
  getOrdersInQueue(sellerid: $userid, completed: $completed){
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
  $sender: String!,
  $receiver: String!
){
  getMessagesBySender(
    sender: $sender
    receiver: $receiver
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
  $receiver: String!,
  $sender: String!
  ){
  getMessagesByReceiver(
    receiver: $receiver
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

export const SENT_MESSAGES_BY_USERID=gql`query sentMessagesByUserId(
  $userid: String!
  ){
    sentMessagesByUserId(userid: $userid){
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

export const RECEIVED_MESSAGES_BY_USERID=gql`query receivedMessagesByUserId(
  $userid: String!
  ){
    receivedMessagesByUserId(userid: $userid){
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
export const ALL_USERS_MIN_INFO=gql`query allUsers{
  allUsers{
    id
    username
    profilepicturepath
  }

}`;

export const GET_BIDS_BY_USERID=gql`query getServiceBidsByUserId($userid: String!){
  getServiceBidsByUserId(userid: $userid){
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
    wonby
  }

}`;

export const GET_LISTING_VIEWS_BY_USERID=gql`query getUserServiceViews($sellerid: String){
  getUserServiceViews(sellerid: $sellerid){
    id
    userid
    maincategory
    subcategory
    date
    serviceid
    sellerid
  }

}`;

export const GET_USER_BALANCE=gql`query getUserBalance($sellerid: String!){
  getUserBalance(sellerid: $sellerid){
    id
    serviceid
    servicename
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
    datecompleted
  }

}`;

export const GET_PROFILE_VIEWS_BY_USERID=gql`query allProfileViews($userid: String!){
  getProfilesViewsByUserId(userid: $userid){
    id
    userid
    viewerid
    date
  }

}`;

export const GET_AMOUNT_SPENT=gql`query getUserBalance($userid: String!){
  getAmountSpent(userid: $userid){
    id
    serviceid
    servicename
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
    datecompleted
  }

}`;

export const GET_WITHDRAWAL_HISTORY_BY_USERID=gql`query getWithdrawalHistoryByUserID($userid: String!){
  getWithdrawalHistoryByUserID(userid: $userid){
    id
    userid
    amount
    date
    withdrawalmethod
  }

}`;

export const GET_COMPLETED_ORDERS=gql`query getOrdersInQueue($sellerid: String!, $completed: String!){
  getCompletedJobs(sellerid: $sellerid, completed: $completed){
    id
    serviceid
    servicename
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
    datecompleted
  }

}`;
export const GET_ORDERED_JOBS=gql`query getOrderedJobs($userid: String!, $completed: String!){
  getOrderedJobs(userid: $userid, completed: $completed){
    id
    serviceid
    servicename
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
    datecompleted
  }

}`;

export const GET_WON_BIDS=gql`query getWonBids($wonby: String){
  getWonBids(wonby: $wonby){
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
    wonby
  }

}`;

export const GET_BID_DETAILS=gql`query getServiceBids($id: ID!){
  getServiceBids(id: $id){
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
    wonby
  }

}`;

export const GET_BIDS_BY_SUBCATEGORY=gql`query getServiceBidsBySubCategory($subcategory: String!){
  getServiceBidsBySubCategory(subcategory: $subcategory){
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
    wonby
  }

}`;

export const GET_ALL_CATEGORIES=gql`query allCategories{
  allCategories{
    id
    category
  }

}`;

export const GET_SUBCATEGORIES_BY_CATEGORY=gql`query getSubCategoryByCategory(
  $parentcategory: String!
  ){
  getSubCategoryByCategory(
    parentcategory: $parentcategory
    ){
    id
    subcategory
    parentcategory
  }

}`;

export const ALL_TRANSACTION_HISTORY=gql`query allPurchaseHistory{
    allPurchaseHistory{
      id
      serviceid
      servicename
      userid
      price
      date
      paymentmethod
      sellerid
      maincategory
      subcategory
      completed
      datecompleted
    }

}`;

export const VIEW_TRANSACTION=gql`query getPurchaseHistory(
  $id: ID!
){
  getPurchaseHistory(id: $id){
    id
    serviceid
    servicename
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
    datecompleted
  }

}`;

export const ALL_WITHDRAWAL_HISTORY=gql`query allWithdrawalHistory{
  allWithdrawalHistory{
    id
    userid
    username
    amount
    date
    withdrawalmethod
  }

}`;

export const TRANSACTION_FEES=gql`query allTransactionFees{
  allTransactionFees{
    id
    fixedamount
    percentage
  }

}`;

export const FEATURED_SERVICES=gql`query allFeaturedServices{
  allFeaturedServices{
    id
    serviceid
    expirationdate
    datefeatured
  }

}`;

export const ALL_BIDS=gql`query allServiceBids{
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
    wonby
  }

}`;

export const ALL_TRANSACTIONS=gql`query allPurchaseHistory{
  allPurchaseHistory{
    id
    serviceid
    servicename
    userid
    price
    date
    paymentmethod
    sellerid
    maincategory
    subcategory
    completed
    datecompleted
  }

}`;

export const ALL_REFERRALS=gql`query allReferrals{
  allReferrals{
    id
    userid
    referredby
    date
  }

}`;

export const GET_REFERRALS_BY_USERNAME=gql`query getReferralsByUsername(
  $referredby: String!
){
  getReferralsByUsername(username: $referredby){
    id
    userid
    referredby
    date
  }

}`;

export const GET_REFERRAL_CLICKS_BY_USERNAME=gql`query getReferralClicksByUsername(
  $referredby: String!
){
  getReferralClicksByUsername(username: $referredby){
    id
    userid
    referredby
    date
  }

}`;
