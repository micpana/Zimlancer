import {
    makeExecutableSchema
} from 'graphql-tools';
import {
    resolvers
} from './resolvers';

const typeDefs = `
type User {
  id: ID!
  firstname: String!
  surname: String!
  emailaddress: String!
  username: String!
  password: String!
  profilepicturepath: String
  datejoined: String!
  level: Int!
  skills: String
  country: String!
  city: String!
  bio: String
  balance: Int!
  gender: String!
  dateofbirth: String!
  newsletter: String!
  usertype: String!
  phonenumber: Int!
  plan: String!
  active: String!
  access: String!
  responsetime: Int

 }
 type Service {
    id: ID!
    name: String!
    userid: String!
    username: String!
    price: Int!
    completiontime: Int!
    description: String!
    rating: Int!
    views: Int!
    datelisted: String
    extras1: String
    extras2: String
    extras1price: Int
    extras2price: Int
    extras1additionaltime: Int
    extras2additionaltime: Int
    imagepath1: String!
    imagepath2: String
    imagepath3: String
    maincategory: String!
    subcategory: String!
    typeofdelivery: String!
    
   }
type ServiceReview {
    id: ID!
    serviceid: String!
    userid: String!
    sellerid: String
    review: String!
    rating: Int!
    date: String!
   }
   type Messages {
       id: ID!
       sender: String!
       receiver: String!
       message: String!
       date: String!
       filepath1: String
       filepath2: String
       filepath3: String
       read: String!
   }
   type ServiceBids {
    id: ID!
    name: String!
    userid: String!
    username: String!
    payout: Int!
    expectedcompletiontime: Int!
    numberofbids: Int!
    description: String!
    maincategory: String!
    subcategory: String!
    active: String!
    datelisted: String!
    expirationdate: String!
    typeofdelivery: String!
    bidimage: String!
    wonby: String

}
type BidComments {
    id: ID!
    userid: String!
    sellerid: String!
    bidid: String!
    comment: String!
    datelisted: String!
    
}
type PurchaseHistory {
    id: ID!
    serviceid: String!
    servicename: String!
    userid: String!
    username: String
    price: Int!
    date: String!
    paymentmethod: String!
    sellerid: String!
    sellername: String
    maincategory: String!
    subcategory: String!
    completed: String!
    datecompleted: String

    
}
type WithdrawalHistory {
    id: ID!
    userid: String!
    username: String!
    amount: Int!
    date: String!
    withdrawalmethod: String!
    
}
type PublicForum {
    id: ID!
    userid: String!
    date: String!
    message: String!
    views: Int!
    response: String!
    
}
type ContactUs {
    id: ID!
    userid: String!
    firstname: String!
    surname: String!
    emailaddress: String!
    phonenumber: Int!
    message: String!
    date: String!

    
}
type FavouriteSellers {
    id: ID!
    userid: String!
    sellerid: String!

    
}
type Notifications {
    id: ID!
    userid: String!
    notification: String!
    date: String!
    read: String!
    href: String
    
}
type Interests {
    id: ID!
    userid: String
    maincategory: String!
    subcategory: String
    date: String!
    serviceid: String
    sellerid: String
}
type Searches {
    id: ID!
    userid: String
    searchitem: String!
    date: String!
    
}
type TransactionFees {
    id: ID!
    fixedamount: Int!
    percentage: Int!
    
}
type Categories {
    id: ID!
    category: String!
    
}
type SubCategory {
    id: ID!
    subcategory: String!
    parentcategory: String!
    
}
type FeaturedServices {
    id: ID!
    serviceid: String!
    expirationdate: String!
    datefeatured: String!
    
}
type ProfileViews {
    id: ID!
    userid: String!
    viewerid: String
    date: String!
}
type Referrals {
    id: ID!
    userid: String!
    referredby: String!
    date: String!
}
type ReferralClicks {
    id: ID!
    userid: String
    referredby: String!
    date: String!
}
type Commissions {
    userid: String!
    transactorid: String!
    date: String!
    commission: Int!
    serviceid: String!
}

   #Queries
type Query {
#user queries
     getUser(id: ID!): User
     allUsers: [User]
     userLogin(username: String!, password: String!): [User]
     findUsername(username: String!): [User]
     findEmailAddress(emailaddress: String!): [User]
#service queries
     getService(id: ID!): Service
     getServicesBySubcategory(subcategory: String): [Service]
     allServices: [Service]
     getServicesByUserId(userid: String): [Service]
     searchServices(searchQuery: String!): [Service]
#service review queries
     getServiceReview(id: ID!): ServiceReview
     allServiceReview: [ServiceReview]
     getServiceReviewByServiceId(serviceid: String!): [ServiceReview]
     getSellerRating(sellerid: String): [ServiceReview]
#messages queries
     getMessages(id: ID!): Messages
     allMessages: [Messages]
     getMessagesBySender(sender: String!, receiver: String!): [Messages]
     getMessagesByReceiver(receiver: String!, sender: String!): [Messages]
     sentMessagesByUserId(userid: String!): [Messages]
     receivedMessagesByUserId(userid: String!): [Messages]
#servicebids queries
     getServiceBids(id: ID!): ServiceBids
     allServiceBids: [ServiceBids]
     getWonBids(wonby: String): [ServiceBids]
     getServiceBidsByUserId(userid: String!): [ServiceBids]
     getServiceBidsBySubCategory(subcategory: String!): [ServiceBids]
     searchBids(searchQuery: String!): [ServiceBids]
#bidcomments queries
     getBidComments(id: ID!): BidComments
     allBidComments: [BidComments]
     getBidCommentsByBidId(bidid: String!): [BidComments]
#purchasehistory queries
     getPurchaseHistory(id: ID!): PurchaseHistory
     allPurchaseHistory: [PurchaseHistory]
     getOrdersInQueue(sellerid: String!, completed: String!): [PurchaseHistory]
     getUserBalance(sellerid: String!): [PurchaseHistory]
     getAmountSpent(userid: String!): [PurchaseHistory]
     getCompletedJobs(sellerid: String!, completed: String!): [PurchaseHistory]
     getOrderedJobs(userid: String!, completed: String!): [PurchaseHistory]
#withdrawalhistory queries
     getWithdrawalHistory(id: ID!): WithdrawalHistory
     allWithdrawalHistory: [WithdrawalHistory]
     getWithdrawalHistoryByUserID(userid: String!): [WithdrawalHistory]
#publicforum queries
     getPublicForum(id: ID!): PublicForum
     allPublicForum: [PublicForum]
#contactus queries
     getContactUs(id: ID!): ContactUs
     allContactUs: [ContactUs]
#favouriteseller queries
     getFavouriteSellers(id: ID!): FavouriteSellers
     allFavouriteSellers: [FavouriteSellers]
#featuredservices queries
     getFeaturedServices(id:ID!): FeaturedServices
     allFeaturedServices: [FeaturedServices]
#notification queries
     getNotifications(id: ID!):  Notifications
     allNotifications: [Notifications]
     getNotificationsByUserid(userid: String!): [Notifications]
#interests queries
     getInterests(id: ID!): Interests
     allInterests: [Interests]
     getServiceViews(serviceid: String): [Interests]
     getUserServiceViews(sellerid: String): [Interests]
#searches queries
     getSearches(id: ID!): Searches
     allSearches: [Searches]
#transactionfees queries
     getTransactionFees(id: ID!): TransactionFees
     allTransactionFees: [TransactionFees]
#categories queries
     getCategories(id: ID!): Categories
     allCategories: [Categories]
#subcategory queries
     getSubCategory(id: ID!): SubCategory
     getSubCategoryByCategory(parentcategory: String!): [SubCategory]
     allSubCategory: [SubCategory]
#profileviews queries
     getProfilesViewsByUserId(userid: String!): [ProfileViews]
     allProfileViews: [ProfileViews]
#referrals' queries
     getReferralsByUsername(username: String!): [Referrals]
     allReferrals: [Referrals]
#referral clicks queries
     getReferralClicksByUsername(username: String!): [ReferralClicks]
     allReferralClicks: [ReferralClicks]
#commissions queries
     getCommissionsByUserId(userid: String!): [Commissions]
     allCommissionsEarned: [Commissions]
 }

 #Inputs
 input UserInput {
    firstname: String!
    surname: String!
    emailaddress: String!
    username: String!
    password: String!
    profilepicturepath: String
    datejoined: String!
    level: Int!
    skills: String
    country: String!
    city: String!
    bio: String
    balance: Int!
    gender: String!
    dateofbirth: String!
    newsletter: String!
    usertype: String!
    phonenumber: Int!
    plan: String!
    active: String!
    access: String!
    responsetime: Int
   }
   input ServiceInput {
    name: String!
    userid: String!
    username: String!
    price: Int!
    completiontime: Int!
    description: String!
    rating: Int!
    views: Int!
    datelisted: String
    extras1: String
    extras2: String
    extras1price: Int
    extras2price: Int
    extras1additionaltime: Int
    extras2additionaltime: Int
    imagepath1: String!
    imagepath2: String
    imagepath3: String
    maincategory: String!
    subcategory: String!
    typeofdelivery: String!
    
   }
   input ServiceReviewInput {
    serviceid: String!
    userid: String!
    sellerid: String
    review: String!
    rating: Int!
    date: String!
   }
   input MessagesInput {
    sender: String!
    receiver: String!
    message: String!
    date: String!
    filepath1: String
    filepath2: String
    filepath3: String
    read: String!
}
input ServiceBidsInput {
    name: String!
    userid: String!
    username: String!
    payout: Int!
    expectedcompletiontime: Int!
    numberofbids: Int!
    description: String!
    maincategory: String!
    subcategory: String!
    active: String!
    datelisted: String!
    expirationdate: String!
    typeofdelivery: String!
    bidimage: String!
    wonby: String

}
input BidCommentsInput {
    userid: String!
    sellerid: String!
    bidid: String!
    comment: String!
    datelisted: String!
    
}
input PurchaseHistoryInput {
    serviceid: String!
    servicename: String!
    userid: String!
    username: String
    price: Int!
    date: String!
    paymentmethod: String!
    sellerid: String!
    sellername: String
    maincategory: String!
    subcategory: String!
    completed: String!
    datecompleted: String
    
}
input WithdrawalHistoryInput {
    userid: String!
    username: String!
    amount: Int!
    date: String!
    withdrawalmethod: String!
    
}
input PublicForumInput {
    userid: String!
    date: String!
    message: String!
    views: Int!
    response: String!
    
}
input ContactUsInput {
    userid: String!
    firstname: String!
    surname: String!
    emailaddress: String!
    phonenumber: Int!
    message: String!
    date: String!

    
}
input FavouriteSellersInput {
    userid: String!
    sellerid: String!

    
}
input NotificationsInput {
    userid: String!
    notification: String!
    date: String!
    read: String!
    href: String
    
}
input InterestsInput {
    userid: String
    maincategory: String!
    subcategory: String!
    date: String!
    serviceid: String
    sellerid: String
    
}
input SearchesInput {
    userid: String
    searchitem: String!
    date: String!
    
}
input TransactionFeesInput {
    fixedamount: Int!
    percentage: Int!
    
}
input CategoriesInput {
    category: String!
    
}
input SubCategoryInput {
    subcategory: String!
    parentcategory: String!
    
}
input FeaturedServicesInput {
    serviceid: String!
    expirationdate: String!
    datefeatured: String!
    
}
input ProfileViewsInput {
    userid: String!
    viewerid: String
    date: String!
}
input ReferralsInput {
    userid: String!
    referredby: String!
    date: String!
}
input ReferralClicksInput {
    userid: String
    referredby: String!
    date: String!
}
#Mutations
  type Mutation {
#user mutations
    createUser(input: UserInput) : User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!) : User
#service mutations
    createService(input: ServiceInput) : Service
    updateService(id: ID!, input: ServiceInput): Service
    deleteService(id: ID!) : Service
#servicereview mutations
    createServiceReview(input: ServiceReviewInput) : ServiceReview
    updateServiceReview(id: ID!, input: ServiceReviewInput): ServiceReview
    deleteServiceReview(id: ID!) : ServiceReview
#messages mutations
    createMessage(input: MessagesInput) : Messages
    updateMessage(id: ID!, input: MessagesInput): Messages
    deleteMessage(id: ID!) : Messages
#servicebids mutations
   createServiceBid(input: ServiceBidsInput) : ServiceBids
   updateServiceBid(id: ID!, input: ServiceBidsInput): ServiceBids
   deleteServiceBid(id: ID!) : ServiceBids
#bidcomments mutations
    createBidComment(input: BidCommentsInput) : BidComments
    updateBidComment(id: ID!, input: BidCommentsInput): BidComments
    deleteBidComment(id: ID!) : BidComments
#purchasehistory mutations
    createPurchaseHistory(input: PurchaseHistoryInput) : PurchaseHistory
    updatePurchaseHistory(id: ID!, input: PurchaseHistoryInput): PurchaseHistory
    deletePurchaseHistory(id: ID!) : PurchaseHistory
#withdrawalhistory mutations
    createWithdrawalHistory(input: WithdrawalHistoryInput) : WithdrawalHistory
    updateWithdrawalHistory(id: ID!, input: WithdrawalHistoryInput): WithdrawalHistory
    deleteWithdrawalHistory(id: ID!) : WithdrawalHistory
#publicforum mutations
    createPublicForum(input: PublicForumInput) : PublicForum
    updatePublicForum(id: ID!, input: PublicForumInput): PublicForum
    deletePublicForum(id: ID!) : PublicForum
#contactus mutations
    createContactUs(input: ContactUsInput) : ContactUs
    updateContactUs(id: ID!, input: ContactUsInput): ContactUs
    deleteContactUs(id: ID!) : ContactUs
#favouritesellers mutations
    createFavouriteSeller(input: FavouriteSellersInput) : FavouriteSellers
    updateFavouriteSeller(id: ID!, input: FavouriteSellersInput): FavouriteSellers
    deleteFavouriteSeller(id: ID!) : FavouriteSellers
#notifications mutations
    createNotification(input: NotificationsInput) : Notifications
    updateNotification(id: ID!, input: NotificationsInput): Notifications
    deleteNotification(id: ID!) : Notifications
#interests mutations
    createInterests(input: InterestsInput) : Interests
    updateInterests(id: ID!, input: InterestsInput): Interests
    deleteInterests(id: ID!) : Interests
#searches mutations
    createSearches(input: SearchesInput) : Searches
    updateSearches(id: ID!, input: SearchesInput): Searches
    deleteSearches(id: ID!) : Searches
#transactionfees mutations
    createTransactionFee(input: TransactionFeesInput) : TransactionFees
    updateTransactionFee(id: ID!, input: TransactionFeesInput): TransactionFees
    deleteTransactionFee(id: ID!) : TransactionFees
#categories mutations
    createCategory(input: CategoriesInput) : Categories
    updateCategory(id: ID!, input: CategoriesInput): Categories
    deleteCategory(id: ID!) : Categories
#subcategory mutations
    createSubCategory(input: SubCategoryInput) : SubCategory
    updateSubCategory(id: ID!, input: SubCategoryInput): SubCategory
    deleteSubCategory(id: ID!) : SubCategory
#featuredservice mutations
    createFeaturedService(input: FeaturedServicesInput) : FeaturedServices
    updateFeaturedService(id: ID!, input: FeaturedServicesInput): FeaturedServices
    deleteFeaturedService(id: ID!) : FeaturedServices
#profileviews mutations
    addProfileView(input: ProfileViewsInput): ProfileViews
#referrals' mutations
    addReferral(input: ReferralsInput): Referrals
#referral clicks mutations
addReferralClicks(input: ReferralClicksInput): ReferralClicks
  }
`;
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;