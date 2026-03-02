export const en = {
    common: {
        villageName: "Taung Ywar Ma Village",
        tagline: "Help village products reach wider markets while sharing the village's culture with the world.",
        loading: "Loading...",
        error: "Error",
        retry: "Retry",
        refresh: "Refresh",
        cancel: "Cancel",
        save: "Save",
        submit: "Submit",
        update: "Update",
        delete: "Delete",
        edit: "Edit",
        viewDetails: "View Details",
        readMore: "Read More",
        placeholders: {
            search: "Search...",
            email: "your@email.com"
        },
        validation: {
            required: "This field is required.",
            email: "Please enter a valid email address.",
            phone: "Please enter a valid phone number.",
            minLength: "Minimum length is {min} characters.",
            maxLength: "Maximum length is {max} characters.",
            fileType: "Only JPG, PNG, or WEBP files are allowed.",
            fileSize: "File size must not exceed 5 MB."
        },
        toast: {
            success: "Success",
            error: "Error",
            saved: "{entity} saved.",
            deleted: "{entity} deleted.",
            failedToSave: "Failed to save. Please try again.",
            failedToDelete: "Failed to delete. Please try again.",
        },
        confirmDialog: {
            deleteTitle: "Delete {entity}?",
            deleteDesc: "This cannot be undone.",
            confirm: "Confirm",
            cancel: "Cancel"
        },
        emptyMessages: {
            noData: "No data available.",
            noMatch: "No matches found."
        }
    },
    auth: {
        login: {
            title: "Sign In",
            emailLabel: "Email",
            passwordLabel: "Password",
            submitButton: "Sign In",
            forgotPassword: "Forgot Password?",
            errors: {
                invalid: "Incorrect email or password.",
                deactivated: "Your account has been deactivated. Please contact the administrator.",
                emptyPassword: "Password is required."
            }
        },
        reset: {
            title: "Set Your Password",
            banner: "You must set a new password before continuing.",
            currentLabel: "Current Password",
            newLabel: "New Password",
            confirmLabel: "Confirm New Password",
            submitButton: "Set Password",
            errors: {
                mismatch: "Passwords do not match.",
                incorrectCurrent: "Incorrect current password.",
                weak: "Password must be at least 8 characters including 1 uppercase letter and 1 number."
            }
        },
        forbidden: {
            title: "403 - Access Denied",
            desc: "You do not have permission to view this page.",
            returnButton: "Return to Dashboard"
        }
    },
    navigation: {
        public: {
            home: "Home",
            marketplace: "Marketplace",
            crops: "Crops Directory",
            harvestCalendar: "Harvest Calendar",
            archive: "Village Archive",
            festivals: "Festivals",
            youthBlog: "Youth Activities",
            history: "Village History",
            gallery: "Photo Gallery",
            infoHub: "Information Hub",
            marketPrices: "Market Prices",
            announcements: "Announcements",
            emergencyContacts: "Emergency Contacts"
        },
        admin: {
            dashboard: "Dashboard",
            users: "User Management",
            crops: "Crops",
            farmers: "Farmers",
            festivals: "Festivals",
            youthBlog: "Youth Blog",
            announcements: "Announcements",
            marketPrices: "Market Prices",
            emergencyContacts: "Emergency Contacts",
            orderRequests: "Order Requests",
            signOut: "Sign Out"
        }
    },
    public: {
        home: {
            hero: {
                title: "Welcome to Taung Ywar Ma Village",
                subtitle: "Discover our rich cultural heritage, connect with our community, and bring the finest local produce directly to your market.",
                ctaMarketplace: "Explore Marketplace",
                ctaHistory: "Discover Our History"
            },
            features: {
                title: "What We Offer",
                cropsTitle: "Fresh Local Produce",
                cropsDesc: "Direct access to high-quality seasonal crops from our dedicated local farmers.",
                cropsLink: "View Directory",
                infoTitle: "Village Information",
                infoDesc: "Stay updated with the latest market prices, essential community news, and emergency contacts.",
                infoLink: "Go to Info Hub",
                cultureTitle: "Cultural Heritage",
                cultureDesc: "Explore our digital archive featuring festivals, notable figures, and our village history.",
                cultureLink: "Explore Archive"
            },
            cta: {
                title: "Ready to Experience Taung Ywar Ma?",
                desc: "Join us in celebrating our community. Whether you're looking to purchase fresh crops or learn about our traditions, you are welcome here.",
                button: "Browse Marketplace"
            },
            sections: {
                marketplace: "Featured Crops",
                events: "Upcoming Events",
                announcements: "Latest Announcements",
                prices: "Market Prices",
                emergency: "Emergency Contacts"
            },
            links: {
                seeAllCrops: "See All Crops",
                seeAllEvents: "View All Events",
                seeAllAnnouncements: "View All Announcements",
                seeAllPrices: "View All Prices",
                seeAllEmergency: "View Emergency Contacts"
            }
        },
        search: {
            title: "Search Results",
            summary: "Showing results for \"{query}\"",
            empty: "No results found for \"{query}\". Try a different search term.",
            error: "Search is temporarily unavailable. Please try again.",
            groups: {
                crops: "Crops",
                festivals: "Festivals",
                youthBlog: "Youth Blog",
                announcements: "Announcements"
            }
        }
    },
    marketplace: {
        cropsList: {
            title: "Crops Directory",
            filters: {
                categoryAll: "All Categories",
                monthAll: "All Months"
            },
            empty: "No crops are currently listed. Please check back later.",
            emptyFilter: "No crops found for the selected filters."
        },
        cropDetail: {
            notFound: "404 — This crop listing no longer exists.",
            requestTitle: "Request This Crop",
            backLink: "Back to Crops Directory",
            farmerContext: "Farmer"
        },
        farmerProfile: {
            title: "Farmer Profile",
            cropsHeading: "Crops by {name}",
            emptyCrops: "No crops currently listed by this farmer.",
            notFound: "404 — Farmer profile not found."
        },
        harvestCalendar: {
            title: "Harvest Calendar",
            emptyMonth: "No harvests scheduled",
            emptyTotal: "Harvest schedule will be updated soon."
        },
        orderRequest: {
            name: "Your Name",
            phone: "Your Phone Number",
            quantity: "Quantity Requested",
            time: "Preferred Contact Time",
            notes: "Additional Notes",
            submit: "Submit Request",
            successMsg: "Your order request has been submitted. The farmer will contact you to confirm.",
            anotherRequest: "Place Another Request",
            errors: {
                nameReq: "Please enter your name.",
                phoneReq: "Please enter a valid phone number.",
                qtyReq: "Please specify the quantity.",
                general: "Failed to submit order. Please check inputs and try again."
            }
        }
    },
    archive: {
        title: "Village Digital Archive",
        subtitle: "Preserving our vibrant culture, documenting our history, and giving voice to our youth.",
        festivals: {
            title: "Festivals & Cultural Events",
            pastEvent: "Past Event",
            empty: "No upcoming festivals. Please check back later.",
            emptyFilter: "No festivals found for the selected month.",
            notFound: "404 — Event not found.",
            backLink: "Back to Festivals"
        },
        youthBlog: {
            title: "Youth Activities",
            subtitle: "Community projects and volunteer activities by the Taung Ywar Ma Youth Association.",
            empty: "No youth activity posts yet. Check back soon.",
            notFound: "404 — Post not found.",
            backLink: "Back to Youth Activities",
            by: "By"
        },
        history: {
            title: "Village History",
            intro: "Learn about our heritage.",
            empty: "Village history content is coming soon."
        },
        gallery: {
            title: "Photo Gallery",
            filters: {
                all: "All",
                festivals: "Festivals",
                youth: "Youth Activities",
                crops: "Crops",
                life: "Village Life"
            },
            empty: "No photos have been published yet.",
            emptyFilter: "No photos in this category yet."
        }
    },
    infoHub: {
        title: "Information Hub",
        subtitle: "Stay connected with essential updates, market trends, and emergency resources.",
        marketPrices: {
            title: "Daily Market Prices",
            lastUpdated: "Last Updated: {date}",
            columns: {
                crop: "Crop Name",
                price: "Price",
                unit: "Unit",
                market: "Market Name",
                date: "Date"
            },
            empty: "Market price data has not been updated yet. Please check back later."
        },
        announcements: {
            title: "Community Announcements",
            expired: "Expired",
            empty: "No current announcements."
        },
        emergencyContacts: {
            title: "Emergency Contacts",
            notice: "For life-threatening emergencies, call national emergency services immediately.",
            empty: "Emergency contacts have not been configured yet. Please contact the village administrator."
        }
    },
    admin: {
        common: {
            loading: "Loading...",
            actions: "Actions",
            status: "Status",
            add: "Add",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            forbidden: "403 Forbidden - You do not have permission to access this page.",
            published: "Published",
            hidden: "Hidden",
            publishImmediately: "Publish immediately to marketplace",
            deleteConfirmTitle: "Delete Record",
            deleteConfirmDesc: "This action cannot be undone. The record will be permanently removed.",
        },
        dashboard: {
            welcome: "Welcome back",
            overview: "Here is the overview of your village platform today.",
            recentOrders: "Recent Order Requests",
            recentOrdersDesc: "Managing orders helps connect farmers to markets efficiently. Access the full orders list to view details and update statuses.",
            quickLinks: "System Quick Links",
            manageArchive: "Manage Digital Archive",
            postAnnouncement: "Post Announcement",
            updateContacts: "Update Contacts",
            addNewFarmer: "Add New Farmer",
            viewAll: "View All",
            stats: {
                totalCrops: "Total Crops",
                totalFarmers: "Total Farmers",
                pendingOrders: "Pending Order Requests",
                totalAnnouncements: "Total Announcements",
                cropsPublished: "Crops Published",
                festivalsPublished: "Festivals Published",
                myCrops: "My Crops",
                myOrders: "Pending Orders for My Crops"
            },
            actions: {
                addCrop: "Add New Crop",
                addAnnouncement: "Add Announcement",
                updatePrices: "Update Market Prices"
            },
            recentActivity: "Recent Activity"
        },
        users: {
            title: "User Management",
            createButton: "Create New User",
            columns: {
                name: "Full Name",
                email: "Email",
                role: "Role",
                status: "Status",
                date: "Created Date",
                actions: "Actions"
            },
            roles: {
                admin: "Admin",
                editor: "Content Editor",
                farmer: "Farmer"
            },
            statuses: {
                active: "Active",
                inactive: "Inactive"
            },
            actions: {
                edit: "Edit",
                deactivate: "Deactivate",
                reactivate: "Reactivate"
            },
            empty: "No user accounts have been created yet.",
            deactivateConfirmLabel: "Deactivate Account",
            createFormat: {
                name: "Full Name",
                email: "Email Address",
                password: "Password",
                confirmPassword: "Confirm Password",
                role: "Role",
                submit: "Create Account",
                cancel: "Cancel"
            }
        },
        crops: {
            title: "Crops Management",
            addButton: "Add Crop",
            createTitle: "Create New Crop",
            cropName: "Crop Name",
            category: "Category",
            farmer: "Farmer",
            availableQty: "Available Qty",
            quantity: "Quantity",
            unit: "Unit",
            description: "Description",
            selectFarmer: "Select a Farmer",
            noFarmerWarning: "You must create a Farmer profile first before adding crops.",
            saveSuccess: "Crop saved successfully.",
            saveError: "Failed to save crop. Ensure all required fields are filled.",
            deleteSuccess: "Crop deleted successfully.",
            deleteError: "Failed to delete crop.",
            empty: "No crops found. Add one to get started.",
            categories: {
                vegetables: "Vegetables",
                fruits: "Fruits",
                grains: "Grains",
                beans: "Beans/Pulses",
                other: "Other"
            }
        },
        farmers: {
            title: "Farmers Management",
            addButton: "Add Farmer",
            createTitle: "Create Farmer Profile",
            fullName: "Full Name",
            area: "Area",
            phone: "Phone",
            active: "Active",
            inactive: "Inactive",
            linkToAccount: "Link to account",
            phoneNumber: "Phone number",
            villageArea: "Village area / location",
            biography: "Biography",
            optional: "Optional",
            createProfile: "Create Profile",
            deactivateTooltip: "Deactivate",
            deactivateTitle: "Deactivate Account",
            deactivateDesc: "This action will deactivate the farmer profile. They will no longer be visible in the public directory.",
            saveSuccess: "Farmer profile created successfully.",
            saveError: "Failed to add farmer profile. Ensure all required fields are filled and user is not already a farmer.",
            deactivateSuccess: "Farmer profile deactivated.",
            deactivateError: "Failed to deactivate farmer.",
            empty: "No farmer profiles found. Add one to get started."
        },
        festivals: {
            title: "Festivals & Events",
            addButton: "Add Event",
            empty: "No events added."
        },
        youthBlog: {
            title: "Youth Blog Posts",
            addButton: "Add Post",
            empty: "No posts added."
        },
        announcements: {
            title: "Announcements",
            addButton: "Add Announcement",
            empty: "No announcements added."
        },
        marketPrices: {
            title: "Market Prices",
            addButton: "Add Price",
            empty: "No market prices added."
        },
        emergencyContacts: {
            title: "Emergency Contacts",
            addButton: "Add Contact",
            empty: "No contacts added."
        },
        orderRequests: {
            title: "Order Requests",
            empty: "No order requests have been received yet.",
            statusUpdated: "Order status updated to {status}.",
            statusUpdateError: "Failed to update order status.",
            columns: {
                buyerName: "Buyer Name",
                contact: "Contact",
                itemRequested: "Item Requested",
                buyerPhone: "Buyer Phone",
                cropName: "Crop Name",
                farmer: "Farmer Assigned",
                quantity: "Quantity Requested",
                time: "Preferred Time",
                date: "Submitted Date",
                actions: "Actions"
            },
            statuses: {
                pending: "Pending",
                confirmed: "Confirmed",
                fulfilled: "Fulfilled",
                cancelled: "Cancelled"
            },
            actions: {
                confirm: "Confirm",
                cancel: "Cancel",
                markFulfilled: "Mark Fulfilled"
            }
        }
    }
} as const;

type DeepStringify<T> = {
    [P in keyof T]: T[P] extends string ? string : DeepStringify<T[P]>;
};

export type TranslationDictionary = DeepStringify<typeof en>;
