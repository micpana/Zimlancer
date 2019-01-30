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
    $datelisted: String,
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
    createService(input:{
      name: $name
      userid: $userid
      username: $username
      price: $price
      completiontime: $completiontime
      description: $description
      rating: $rating
      views: $views
      datelisted: $datelisted
      extras1: $extras1
      extras2: $extras2
      extras1price: $extras1price
      extras2price: $extras2price
      extras1additionaltime: $extras1additionaltime
      extras2additionaltime: $extras2additionaltime
      imagepath1: $imagepath1
      imagepath2: $imagepath2
      imagepath3: $imagepath3
      maincategory: $maincategory
      subcategory: $subcategory
      typeofdelivery: $typeofdelivery
    }){
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
    createUser(input: {
      firstname: $firstname
      surname: $surname
      emailaddress: $emailaddress
      username: $username
      password: $password
      profilepicturepath: $profilepicturepath
      datejoined: $datejoined
      level: $level
      skills: $skills
      country: $country
      city: $city
      bio: $bio
      balance: $balance
      gender: $gender
      dateofbirth: $dateofbirth
      newsletter: $newsletter
      usertype: $usertype
      phonenumber: $phonenumber
      plan: $plan
      active: $active
      access: $access
      responsetime: $responsetime
    }){
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
    updateUser(id: $id, input: {
      firstname: $firstname
      surname: $surname
      emailaddress: $emailaddress
      username: $username
      password: $password
      profilepicturepath: $profilepicturepath
      datejoined: $datejoined
      level: $level
      skills: $skills
      country: $country
      city: $city
      bio: $bio
      balance: $balance
      gender: $gender
      dateofbirth: $dateofbirth
      newsletter: $newsletter
      usertype: $usertype
      phonenumber: $phonenumber
      plan: $plan
      active: $active
      access: $access
      responsetime: $responsetime
    }){
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
  createServiceBid(input: {
    name: $name
    userid: $userid
    payout: $payout
    expectedcompletiontime: $expectedcompletiontime
    typeofdelivery: $typeofdelivery
    numberofbids: $numberofbids
    description: $description
    maincategory: $maincategory
    subcategory: $subcategory
    active: $active
    datelisted: $datelisted
    expirationdate: $expirationdate
    bidimage: $bidimage
  }){
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


