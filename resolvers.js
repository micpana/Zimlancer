import User from './models/user';
import Service from './models/service';
import ServiceReview from './models/servicereview';
import Messages from './models/messages';
import ServiceBids from './models/servicebid';
import BidComments from './models/bidcomments';
import PurchaseHistory from './models/purchasehistory';
import WithdrawalHistory from './models/withdrawalhistory';
import PublicForum from './models/publicforum';
import ContactUs from './models/contactus';
import FavouriteSellers from './models/favouritesellers';
import Notification from './models/notifications';
import Interests from './models/interests';
import Searches from './models/searches';
import TransactionFees from './models/transactionfees';
import Categories from './models/categories';
import SubCategory from './models/subcategory';
import FeaturedServices from './models/featuredservices';
import ProfileViews from './models/profileviews';
import Referrals from './models/referrals';
import ReferralClicks from './models/referralclicks';
import Commissions from './models/commissions';
const nodemailer = require("nodemailer");//////nodemailer

async function registrationEmail(details){////////////////sending email on user registration

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });
  console.log(details.email)
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Zimlancer" <michaelmudimbu@gmail.com>', // sender address
      to: details.email, // list of receivers
      subject: "Zimlancer Account Registration", // Subject line
      text: "Hello "+ details.name, // plain text body
      html: "<p>Thank you for registering on Zimlancer.</p>" // html body
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
  
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  };

export const resolvers = {////////////////////RESOLVERS///////////////
                                //Queries
    Query: {
    //query for returning users
        async getUser(root, {
            id
        }) {
            return await User.findById(id);
        },
        async allUsers() {
            return await User.find();
        },
        async userLogin(root, {
            username, password
        }) {
            return await User.find({username: username , password: password});
        },
        async findUsername(root, {
            username
        }) {
            return await User.find({username: username});
        },
        async findEmailAddress(root, {
            emailaddress
        }) {
            return await User.find({emailaddress: emailaddress});
        },
    //query for returning services
                async getService(root, {
                    id
                }) {
                    return await Service.findById(id);
                },
                async allServices() {
                    return await Service.find();
                },
                async getServicesBySubcategory(root, {
                    subcategory
                }) {
                    return await Service.find({subcategory:subcategory});
                },
                async getServicesByUserId(root, {
                    userid
                }) {
                    return await Service.find({userid:userid});
                },
                async searchServices(root, {
                    searchQuery
                }) {
                    let stopwords = ["and", "I", "will"]
                    let queryVar = function(str) {
                        let q = str.replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-z\s]+/gi, '').replace(/\s+$/, '');
                    
                        let parts = q.split(/\s/);
                        let terms = [];
                        parts.forEach(part => {
                            if(stopwords.indexOf(part) === -1) {
                                terms.push(part);
                            }
                        });
                        let query = {'$and': []};
                        terms.forEach(term => {
                           let queryFrag = {name: {'$regex': term, '$options': 'i'}};
                           query['$and'].push(queryFrag);
                        });
                        return query;
                    };
                    let query = queryVar(searchQuery);
                    return await Service.find(query);
                },
    //query for returning servicereview
                async getServiceReview(root, {
                    id
                }) {
                    return await ServiceReview.findById(id);
                },
                async allServiceReview() {
                    return await ServiceReview.find();
                },
                async getServiceReviewByServiceId(root, {
                    serviceid
                }) {
                    return await ServiceReview.find({serviceid: serviceid});
                },
                async getSellerRating(root, {
                    sellerid
                }) {
                    return await ServiceReview.find({sellerid: sellerid});
                },
    //query for returning messages
                  async getMessages(root, {
                    id
                }) {
                    return await Messages.findById(id);
                },
                async allMessages() {
                    return await Messages.find();
                },
                async getMessagesBySender(root, {
                    sender, receiver
                }) {
                    return await Messages.find({sender: sender, receiver: receiver});
                },
                async getMessagesByReceiver(root, {
                    receiver, sender
                }) {
                    return await Messages.find({receiver: receiver, sender: sender});
                },
                async sentMessagesByUserId(root, {
                    userid
                }) {
                    return await Messages.find({sender: userid});
                },
                async receivedMessagesByUserId(root, {
                    userid
                }) {
                    return await Messages.find({receiver: userid});
                },
    //query for returning servicebids
                async getServiceBids(root, {
                    id
                }) {
                    return await ServiceBids.findById(id);
                },
                async allServiceBids() {
                    return await ServiceBids.find();
                },
                async getWonBids(root, {
                    wonby
                }) {
                    return await ServiceBids.find({wonby: wonby});
                },
                async getServiceBidsByUserId(root, {
                    userid
                }) {
                    return await ServiceBids.find({userid: userid});
                },
                async getServiceBidsBySubCategory(root, {
                    subcategory
                }) {
                    return await ServiceBids.find({subcategory: subcategory});
                },
                async searchBids(root, {
                    searchQuery
                }) {
                    let stopwords = ["and", "I", "will", "a", "want", "need", "do"]
                    let queryVar = function(str) {
                        let q = str.replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-z\s]+/gi, '').replace(/\s+$/, '');
                    
                        let parts = q.split(/\s/);
                        let terms = [];
                        parts.forEach(part => {
                            if(stopwords.indexOf(part) === -1) {
                                terms.push(part);
                            }
                        });
                        let query = {'$and': []};
                        terms.forEach(term => {
                           let queryFrag = {name: {'$regex': term, '$options': 'i'}};
                           query['$and'].push(queryFrag);
                        });
                        return query;
                    };
                    let query = queryVar(searchQuery);
                    return await ServiceBids.find(query);
                },
    //query for returning bidcomments
                  async getBidComments(root, {
                    id
                }) {
                    return await BidComments.findById(id);
                },
                async allBidComments() {
                    return await BidComments.find();
                },
                async getBidCommentsByBidId(root, {
                    bidid
                }) {
                    return await BidComments.find({bidid: bidid});
                },
    //query for returning purchasehistory
                 async getPurchaseHistory(root, {
                    id
                }) {
                    return await PurchaseHistory.findById(id);
                },
                async allPurchaseHistory() {
                    return await PurchaseHistory.find();
                },
                async getOrdersInQueue(root, {
                    sellerid, completed
                }) {
                    return await PurchaseHistory.find({sellerid: sellerid, completed: completed});
                },
                async getCompletedJobs(root, {
                    sellerid, completed
                }) {
                    return await PurchaseHistory.find({sellerid: sellerid, completed: completed});
                },
                async getOrderedJobs(root, {
                    userid, completed
                }) {
                    return await PurchaseHistory.find({userid: userid, completed: completed});
                },
                async getUserBalance(root, {
                    sellerid
                }) {
                    return await PurchaseHistory.find({sellerid: sellerid});
                },
                async getAmountSpent(root, {
                    userid
                }) {
                    return await PurchaseHistory.find({userid: userid});
                },
    //query for returning withdrawalhistory
                async getWithdrawalHistory(root, {
                    id
                }) {
                    return await WithdrawalHistory.findById(id);
                },
                async allWithdrawalHistory() {
                    return await WithdrawalHistory.find();
                },
                async getWithdrawalHistoryByUserID(root, {
                    userid
                }) {
                    return await WithdrawalHistory.find({userid: userid});
                },
    //query for returning publicforum
                 async getPublicForum(root, {
                    id
                }) {
                    return await PublicForum.findById(id);
                },
                async allPublicForum() {
                    return await PublicForum.find();
                },
    //query for returning contactus
                  async getContactUs(root, {
                    id
                }) {
                    return await ContactUs.findById(id);
                },
                async allContactUs() {
                    return await ContactUs.find();
                },
    //query for returning favouriteseller
                async getFavouriteSellers(root, {
                    id
                }) {
                    return await FavouriteSellers.findById(id);
                },
                async allFavouriteSellers() {
                    return await FavouriteSellers.find();
                },
    //query for returning featuredservices
                  async getFeaturedServices(root, {
                    id
                }) {
                    return await FeaturedServices.findById(id);
                },
                async allFeaturedServices() {
                    return await FeaturedServices.find();
                },
    //query for returning notifications
                 async getNotifications(root, {
                    id
                }) {
                    return await Notification.findById(id);
                },
                async allNotifications() {
                    return await Notification.find();
                },
                async getNotificationsByUserid(root, {
                    userid
                }) {
                    return await Notification.find({userid: userid});
                },
    //query for returning interests
                 async getInterests(root, {
                    id
                }) {
                    return await Interests.findById(id);
                },
                async allInterests() {
                    return await Interests.find();
                },
                async getServiceViews(root, {
                    serviceid
                }) {
                    return await Interests.find(serviceid);
                },
                async getUserServiceViews(root, {
                    sellerid
                }) {
                    return await Interests.find({sellerid: sellerid});
                },
    //query for returning searches
                async getSearches(root, {
                    id
                }) {
                    return await Searches.findById(id);
                },
                async allSearches() {
                    return await Searches.find();
                },
    //query for returning transactionfees
                async getTransactionFees(root, {
                    id
                }) {
                    return await TransactionFees.findById(id);
                },
                async allTransactionFees() {
                    return await TransactionFees.find();
                },
    //query for returning categories
                  async getCategories(root, {
                    id
                }) {
                    return await Categories.findById(id);
                },
                async allCategories() {
                    return await Categories.find();
                },
    //query for returning subcategories
                   async getSubCategory(root, {
                    id
                }) {
                    return await SubCategory.findById(id);
                },
                async getSubCategoryByCategory(root, {
                    parentcategory
                }) {
                    return await SubCategory.find({parentcategory: parentcategory});
                },
                async allSubCategory() {
                    return await SubCategory.find();
                },
    //query for returning profile views
                 async getProfilesViewsByUserId(root, {
                    userid
                }) {
                    return await ProfileViews.find({userid: userid});
                },
                async allProfileViews() {
                    return await ProfileViews.find();
                }, 
    //query for returning referrals
                async getReferralsByUsername(root, {
                   username
               }) {
                   return await Referrals.find({referredby: username});
               },
               async allReferrals() {
                   return await Referrals.find();
               },
    //////////returning referral link clicks
               async allReferralClicks() {
                return await ReferralClicks.find();
            },
            async getReferralClicksByUsername(root, {
                username
            }) {
                return await ReferralClicks.find({referredby: username});
            },
       //////////returning user's commissions earned
       async allCommissionsEarned() {
        return await Commissions.find();
    },
    async getCommissionsByUserId(root, {
        userid
    }) {
        return await Commissions.find({referredby: userid});
    },        

    },//end of queries
///////////////////////////////////////////////////////////////////////
                                      //Mutations
    Mutation: {
    //mutations for user
        async createUser(root, {
            input
        }) {
var details={
    email : input.emailaddress,
    name : input.firstname
};

registrationEmail(details);/////////sending welcome email
return await User.create(input);
        },
        async updateUser(root, {
            id,
            input
        }) {
  return await User.findByIdAndUpdate(
                id, input, {
                    new: true
                })
        },
        async deleteUser(root, {
            id
        }) {
            return await User.findByIdAndRemove(id);
        },
    //mutations for service
        async createService(root, {
            input
        }) {
            return await Service.create(input);
        }
        ,
        async updateService(root, {
            id,
            input
        }) {
            return await Service.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteService(root, {
            id
        }) {
            return await Service.findByIdAndRemove(id);
        },
    //mutations for servicereview
        async createServiceReview(root, {
            input
        }) {
            return await ServiceReview.create(input);
        }
        ,
        async updateServiceReview(root, {
            id,
            input
        }) {
            return await Service.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteServiceReview(root, {
            id
        }) {
            return await Service.findByIdAndRemove(id);
        },
    //mutations for messages
         async createMessage(root, {
            input
        }) {
            return await Messages.create(input);
        }
        ,
        async updateMessage(root, {
            id,
            input
        }) {
            return await Messages.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteMessage(root, {
            id
        }) {
            return await Messages.findByIdAndRemove(id);
        },
    //mutations for servicebids
         async createServiceBid(root, {
            input
        }) {
            return await ServiceBids.create(input);
        }
        ,
        async updateServiceBid(root, {
            id,
            input
        }) {
            return await ServiceBids.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteServiceBid(root, {
            id
        }) {
            return await ServiceBids.findByIdAndRemove(id);
        },
    //mutations for bidcomments
         async createBidComment(root, {
            input
        }) {
            return await BidComments.create(input);
        }
        ,
        async updateBidComment(root, {
            id,
            input
        }) {
            return await BidComments.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteBidComment(root, {
            id
        }) {
            return await BidComments.findByIdAndRemove(id);
        },
    //mutations for purchasehistory
         async createPurchaseHistory(root, {
            input
        }) {
            return await PurchaseHistory.create(input);
        }
        ,
        async updatePurchaseHistory(root, {
            id,
            input
        }) {
            return await PurchaseHistory.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deletePurchaseHistory(root, {
            id
        }) {
            return await PurchaseHistory.findByIdAndRemove(id);
        },
    //mutations for withdrawalhistory
        async createWithdrawalHistory(root, {
            input
        }) {
            return await WithdrawalHistory.create(input);
        }
        ,
        async updateWithdrawalHistory(root, {
            id,
            input
        }) {
            return await WithdrawalHistory.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteWithdrawalHistory(root, {
            id
        }) {
            return await WithdrawalHistory.findByIdAndRemove(id);
        },
    //mutations for publicforum
         async createPublicForum(root, {
            input
        }) {
            return await PublicForum.create(input);
        }
        ,
        async updatePublicForum(root, {
            id,
            input
        }) {
            return await PublicForum.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deletePublicForum(root, {
            id
        }) {
            return await PublicForum.findByIdAndRemove(id);
        },
    //mutations for contactus
        async createContactUs(root, {
            input
        }) {
            return await ContactUs.create(input);
        }
        ,
        async updateContactUs(root, {
            id,
            input
        }) {
            return await ContactUs.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteContactUs(root, {
            id
        }) {
            return await ContactUs.findByIdAndRemove(id);
        },
    //mutations for favouriteseller
        async createFavouriteSeller(root, {
            input
        }) {
            return await FavouriteSellers.create(input);
        }
        ,
        async updateFavouriteSeller(root, {
            id,
            input
        }) {
            return await FavouriteSellers.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteFavouriteSeller(root, {
            id
        }) {
            return await FavouriteSellers.findByIdAndRemove(id);
        },
    //mutations for featuredservices
         async createFeaturedService(root, {
            input
        }) {
            return await FeaturedServices.create(input);
        }
        ,
        async updateFeaturedService(root, {
            id,
            input
        }) {
            return await FeaturedServices.findByIdAndUpdate(
                id, input, {
                    new: true
                })        },
        async deleteFeaturedService(root, {
            id
        }) {
            return await FeaturedServices.findByIdAndRemove(id);
        },
    //mutations for notifications
    async createNotification(root, {
        input
    }) {
        return await Notification.create(input);
    },
    async updateNotification(root, {
        id,
        input
    }) {
        return await Notification.findByIdAndUpdate(
            id, input, {
                new: true
            })    },
    async deleteNotification(root, {
        id
    }) {
        return await Notification.findByIdAndRemove(id);
    },
    //mutations for interests
    async createInterests(root, {
        input
    }) {
        return await Interests.create(input);
    }
    ,
    async updateInterests(root, {
        id,
        input
    }) {
        return await Interests.findByIdAndUpdate(
            id, input, {
                new: true
            })    },
    async deleteInterests(root, {
        id
    }) {
        return await Interests.findByIdAndRemove(id);
    },
//mutations for searches
    async createSearches(root, {
        input
    }) {
        return await Searches.create(input);
    }
    ,
    async updateSearches(root, {
        id,
        input
    }) {
        return await Searches.findByIdAndUpdate(
            id, input, {
                new: true
            })    },
    async deleteSearches(root, {
        id
    }) {
        return await Searches.findByIdAndRemove(id);
    },
//mutations for transactionfees
    async createTransactionFee(root, {
        input
    }) {
        return await TransactionFees.create(input);
    }
    ,
    async updateTransactionFee(root, {
        id,
        input
    }) {
        return await TransactionFees.findByIdAndUpdate(
            id, input, {
                new: true
            })    },
    async deleteTransactionFee(root, {
        id
    }) {
        return await TransactionFees.findByIdAndRemove(id);
    },
    //mutations for categories
    async createCategory(root, {
        input
    }) {
        return await Categories.create(input);
    }
    ,
    async updateCategory(root, {
        id,
        input
    }) {
        return await Categories.findByIdAndUpdate(
            id, input, {
                new: true
            })    },
    async deleteCategory(root, {
        id
    }) {
        return await Categories.findByIdAndRemove(id);
    },
    //mutations for subcategory
    async createSubCategory(root, {
        input
    }) {
        return await SubCategory.create(input);
    }
    ,
    async updateSubCategory(root, {
        id,
        input
    }) {
        return await SubCategory.findByIdAndUpdate(
            id, input, {
                new: true
            })    },
    async deleteSubCategory(root, {
        id
    }) {
        return await SubCategory.findByIdAndRemove(id);
    },
    //mutations for adding profile view
    async addProfileView(root, {
        input
    }) {
        return await ProfileViews.create(input);
    },
     //mutations for adding referral
     async addReferral(root, {
        input
    }) {
        return await Referrals.create(input);
    },
     //mutations for adding referralclicks
     async addReferralClicks(root, {
        input
    }) {
        return await ReferralClicks.create(input);
    }


    }//end of mutations
};
