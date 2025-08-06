import gql from 'graphql-tag';

  export const UPLOAD_SERVICE=gql` mutation createService(
    $name: String!,
    $userid: String!,
    $username: String!,
    $price: Int!,
    $completiontime: Int!,
    $description: String!,
    $rating: Int!,
    $views: Int!,
    $datelisted: String!,
    $extras1: String,
    $extras2: String,
    $extras1price: Int,
    $extras2price: Int,
    $extras1additionaltime: Int,
    $extras2additionaltime: Int,
    $imagepath1: String!,
    $imagepath2: String,
    $imagepath3: String,
    $maincategory: String!,
    $subcategory: String!,
    $typeofdelivery: String!
  ){
    createService(
      name: $name,
      userid: $userid,
      username: $username,
      price: $price,
      completiontime: $completiontime,
      description: $description,
      rating: $rating,
      views: $views,
      datelisted: $datelisted,
      extras1: $extras1,
      extras2: $extras2,
      extras1price: $extras1price,
      extras2price: $extras2price,
      extras1additionaltime: $extras1additionaltime,
      extras2additionaltime: $extras2additionaltime,
      imagepath1: $imagepath1,
      imagepath2: $imagepath2,
      imagepath3: $imagepath3,
      maincategory: $maincategory,
      subcategory: $subcategory,
      typeofdelivery: $typeofdelivery
    ){
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

  export const CREATE_USER=gql` mutation createUser(
    $firstname: String!,
    $surname: String!,
    $emailaddress: String!,
    $username: String!,
    $password: String!,
    $profilepicturepath: String,
    $datejoined: String!,
    $level: Int!,
    $skills: String,
    $country: String!,
    $city: String!,
    $bio: String,
    $balance: Int!,
    $gender: String!,
    $dateofbirth: String!,
    $newsletter: String!,
    $usertype: String!,
    $phonenumber: Int!,
    $plan: String!,
    $active: String!,
    $access: String!,
    $responsetime: Int
  ){
    createUser(
      firstname: $firstname,
      surname: $surname,
      emailaddress: $emailaddress,
      username: $username,
      password: $password,
      profilepicturepath: $profilepicturepath,
      datejoined: $datejoined,
      level: $level,
      skills: $skills,
      country: $country,
      city: $city,
      bio: $bio,
      balance: $balance,
      gender: $gender,
      dateofbirth: $dateofbirth,
      newsletter: $newsletter,
      usertype: $usertype,
      phonenumber: $phonenumber,
      plan: $plan,
      active: $active,
      access: $access,
      responsetime: $responsetime
    ){
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

  export const UPDATE_USER=gql` mutation updateUser(
    $id: ID!,
    $firstname: String!,
    $surname: String!,
    $emailaddress: String!,
    $username: String!,
    $password: String!,
    $profilepicturepath: String,
    $datejoined: String!,
    $level: Int!,
    $skills: String,
    $country: String!,
    $city: String!,
    $bio: String,
    $balance: Int!,
    $gender: String!,
    $dateofbirth: String!,
    $newsletter: String!,
    $usertype: String!,
    $phonenumber: Int!,
    $plan: String!,
    $active: String!,
    $access: String!,
    $responsetime: Int
  ){
    updateUser(
      id: $id,
      firstname: $firstname,
      surname: $surname,
      emailaddress: $emailaddress,
      username: $username,
      password: $password,
      profilepicturepath: $profilepicturepath,
      datejoined: $datejoined,
      level: $level,
      skills: $skills,
      country: $country,
      city: $city,
      bio: $bio,
      balance: $balance,
      gender: $gender,
      dateofbirth: $dateofbirth,
      newsletter: $newsletter,
      usertype: $usertype,
      phonenumber: $phonenumber,
      plan: $plan,
      active: $active,
      access: $access,
      responsetime: $responsetime
    ){
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

export const CREATE_SERVICE_BID=gql` mutation createServiceBid(
    $name: String!,
    $userid: String!,
    $username: String!,
    $payout: Int!,
    $expectedcompletiontime: Int!,
    $typeofdelivery: String!,
    $numberofbids: Int!,
    $description: String!,
    $maincategory: String!,
    $subcategory: String!,
    $active: String!,
    $datelisted: String!,
    $expirationdate: String!,
    $bidimage: String!
){
  createServiceBid(
    name: $name,
    userid: $userid,
    username: $username,
    payout: $payout,
    expectedcompletiontime: $expectedcompletiontime,
    typeofdelivery: $typeofdelivery,
    numberofbids: $numberofbids,
    description: $description,
    maincategory: $maincategory,
    subcategory: $subcategory,
    active: $active,
    datelisted: $datelisted,
    expirationdate: $expirationdate,
    bidimage: $bidimage
  ){
    id
    name
    userid
    payout
    expectedcompletiontime
    typeofdelivery
    numberofbids
    description
    maincategory
    subcategory
    active
    datelisted
    expirationdate
    bidimage
  }
}`;

export const SEND_MESSAGE=gql` mutation createMessage(
  $sender: String!,
  $receiver: String!,
  $message: String!,
  $date: String!,
  $filepath1: String,
  $filepath2: String,
  $filepath3: String,
  $read: String!
){
createMessage(
  sender: $sender,
  receiver: $receiver,
  message: $message,
  date: $date,
  filepath1: $filepath1,
  filepath2: $filepath2,
  filepath3: $filepath3,
  read: $read
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

export const ADD_PROFILE_VIEW=gql` mutation addProfileView(
  $userid: String!,
  $viewerid: String,
  $date: String!
){
addProfileView(
  userid: $userid,
  viewerid: $viewerid,
  date: $date
){
    id
    userid
    viewerid
    date
}
}`;

export const ADD_INTEREST=gql` mutation createInterests(
  $userid: String
  $maincategory: String!
  $subcategory: String!
  $date: String!
  $serviceid: String
  $sellerid: String
){
createInterests(
    userid: $userid,
    maincategory: $maincategory,
    subcategory: $subcategory,
    date: $date,
    serviceid: $serviceid,
    sellerid: $sellerid
){
  userid
  maincategory
  subcategory
  date
  serviceid
  sellerid
}
}`;

export const ADD_CATEGORY=gql` mutation createCategory(
  $category: String!,
){
  createCategory(
    category: $category
  ){
    id
    category
  }
}`;

export const ADD_SUBCATEGORY=gql` mutation createSubCategory(
  $parentcategory: String!,
  $subcategory: String!
){
  createSubCategory(
parentcategory: $parentcategory,
subcategory: $subcategory
  ){
    id
    parentcategory
    subcategory
  }
}`;

export const UPDATE_TRANSACTION_FEE=gql` mutation updateTransactionFee(
 $id: ID!,
 $fixedamount: Int!,
 $percentage: Int!
){
  updateTransactionFee(
    id: $id,
    fixedamount: $fixedamount,
    percentage: $percentage
  ){
    id
    fixedamount
    percentage
  }
}`;

export const ADD_REFERRAL=gql` mutation addReferral(
  $userid: String!,
  $referredby: String!,
  $date: String!
 ){
  addReferral(
    userid: $userid,
    referredby: $referredby,
    date: $date
  ){
    id
    userid
    referredby
    date
  }
 }`;

 export const ADD_REFERRAL_CLICK=gql` mutation addReferralClicks(
  $userid: String,
  $referredby: String!,
  $date: String!
 ){
  addReferralClicks(
    userid: $userid,
    referredby: $referredby,
    date: $date
  ){
    id
    userid
    referredby
    date
  }
 }`;

 export const CREATE_SERVICE_REVIEW=gql` mutation createServiceReview(
  $serviceid: String!,
  $userid: String!,
  $sellerid: String,
  $review: String!,
  $rating: Int!,
  $date: String!
 ){
  createServiceReview(
    serviceid: $serviceid,
    userid: $userid,
    sellerid: $sellerid,
    review: $review,
    rating: $rating,
    date: $date
  ){
    id
    serviceid
    userid
    sellerid
    review
    rating
    date
  }
 }`;

 export const UPDATE_NOTIFICATION=gql` mutation updateNotification(
  $id: ID!
  $userid: String!,
  $notification: String!,
  $date: String!,
  $read: String!,
  $href: String
 ){
  updateNotification(
    id: $id,
    userid: $userid,
    notification: $notification,
    date: $date,
    read: $read,
    href: $href
  ){
    id
    userid
    notification
    date
    read
    href
  }
 }`;

 export const CREATE_NOTIFICATION=gql` mutation createNotification(
  $userid: String!,
  $notification: String!,
  $date: String!,
  $read: String!,
  $href: String
 ){
  createNotification(
    userid: $userid,
    notification: $notification,
    date: $date,
    read: $read,
    href: $href
  ){
    id
    userid
    notification
    date
    read
    href
  }
 }`;

 export const CREATE_SEARCH=gql` mutation createSearches(
  $userid: String,
  $searchitem: String!,
  $date: String!
 ){
  createSearches(
    userid: $userid,
    searchitem: $searchitem,
    date: $date
  ){
    id
    userid
    searchitem
    date
  }
 }`;


 export const CREATE_BID_COMMENT=gql` mutation createBidComment(
  $userid: String!,
  $sellerid: String!,
  $bidid: String!,
  $comment: String!,
  $datelisted: String!
 ){
  createBidComment(
    userid: $userid,
    sellerid: $sellerid,
    bidid: $bidid,
    comment: $comment,
    datelisted: $datelisted
  ){
    id
    userid
    sellerid
    bidid
    comment
    datelisted
  }
 }`;

 export const UPDATE_SERVICE_BID=gql` mutation updateServiceBid(
   $id: ID!
  $name: String!,
  $userid: String!,
  $username: String!,
  $payout: Int!,
  $expectedcompletiontime: Int!,
  $typeofdelivery: String!,
  $numberofbids: Int!,
  $description: String!,
  $maincategory: String!,
  $subcategory: String!,
  $active: String!,
  $datelisted: String!,
  $expirationdate: String!,
  $bidimage: String!,
  $wonby: String
){
updateServiceBid(
  id: $id,
  name: $name,
  userid: $userid,
  username: $username,
  payout: $payout,
  expectedcompletiontime: $expectedcompletiontime,
  typeofdelivery: $typeofdelivery,
  numberofbids: $numberofbids,
  description: $description,
  maincategory: $maincategory,
  subcategory: $subcategory,
  active: $active,
  datelisted: $datelisted,
  expirationdate: $expirationdate,
  bidimage: $bidimage,
  wonby: $wonby
){
  id
  name
  userid
  username
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

export const UPDATE_MESSAGE=gql` mutation updateMessage(
  $id: ID!
  $sender: String!,
  $receiver: String!,
  $message: String!,
  $date: String!,
  $filepath1: String,
  $filepath2: String,
  $filepath3: String,
  $read: String!
){
updateMessage(
  id: $id,
  sender: $sender,
  receiver: $receiver,
  message: $message,
  date: $date,
  filepath1: $filepath1,
  filepath2: $filepath2,
  filepath3: $filepath3,
  read: $read
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