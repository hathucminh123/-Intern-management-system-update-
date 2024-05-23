
import MentorPage from "../pages/MentorPage/MentorPage"
import SigninPage from "../pages/LoginPage/SigninPage"
import HRPage from "../pages/HRPage/HRPage"
import HRPageCampaignsDetails from "../pages/HRPageCampaignsDetails/HRPageCampaignsDetails"
export const routes = [


    // {
    //     path:'/HRsystem',
    //     page:HRPage,


    // },
    {
        path: '/mentor',
        page: MentorPage,



    },
    {
        path: '/sign-in',
        page: SigninPage,


    },
    {
        path: '/hr',
        page: HRPage,


    },
    {
        path: '/hrdetails',
        page: HRPageCampaignsDetails,

    },
]