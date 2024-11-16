import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AboutCaseComponent } from './about-case/about-case.component';
import { AdvocatePageComponent } from './advocate-page/advocate-page.component';
import { AdvocatePortfolioComponent } from './advocate-portfolio/advocate-portfolio.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { VakilProfileComponent } from './vakil-profile/vakil-profile.component';
import { AddClientCaseComponent } from './add-client-case/add-client-case.component';
import { PublicationManagementComponent } from './publication-management/publication-management.component';
import { ImageBannerManagementComponent } from './image-banner-management/image-banner-management.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { IpcPanelComponent } from './ipc-panel/ipc-panel.component';
import { KanoonListComponent } from './kanoon-list/kanoon-list.component';
import { TalkToLawyerComponent } from './talk-to-lawyer/talk-to-lawyer.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { RobotChatComponent } from './robot-chat/robot-chat.component';
import { VakilTotalCaseComponent } from './vakil-total-case/vakil-total-case.component';
import { CaseDocumentsComponent } from './case-documents/case-documents.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { VakilReviewComponent } from './vakil-review/vakil-review.component';
import { MembershipPremiumComponent } from './membership-premium/membership-premium.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PaymentLockComponent } from '../payment-lock/payment-lock.component';
import { UpcomingCourtListComponent } from './upcoming-court-list/upcoming-court-list.component';
import { UpcomingCourtHearingListComponent } from './upcoming-court-hearing-list/upcoming-court-hearing-list.component';
import { RecentClientListComponent } from './recent-client-list/recent-client-list.component';
import { AddHearingDateComponent } from './add-hearing-date/add-hearing-date.component';
import { TodayHearingComponent } from './today-hearing/today-hearing.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { ChatingClientComponent } from './chating-client/chating-client.component';
import { ChatingVakilComponent } from './chating-vakil/chating-vakil.component';
import { ChangeLawyersListComponent } from './change-lawyers-list/change-lawyers-list.component';
import { IpcDetailsComponent } from './ipc-details/ipc-details.component';
import { ClientHearingListComponent } from './client-hearing-list/client-hearing-list.component';
import { ClientCaseAboutComponent } from './client-case-about/client-case-about.component';
import { VakilByClientTotalCaseComponent } from './vakil-by-client-total-case/vakil-by-client-total-case.component';
import { AchievementAddComponent } from './achievement-add/achievement-add.component';
import { RewardsAddComponent } from './rewards-add/rewards-add.component';
import { VideoPlayComponent } from './video-play/video-play.component';
import { ReportTotalClientComponent } from './report-total-client/report-total-client.component';
import { ClientPaymentListComponent } from './client-payment-list/client-payment-list.component';
import { ClientPaymentHistoryComponent } from './client-payment-history/client-payment-history.component';
import { ClientAddVakilPaymentComponent } from './client-add-vakil-payment/client-add-vakil-payment.component';
import { ClientDuePaymentComponent } from './client-due-payment/client-due-payment.component';
import { MembershipPlanValidityComponent } from './membership-plan-validity/membership-plan-validity.component';
import { VakilAccountStatusComponent } from './vakil-account-status/vakil-account-status.component';
import { VakilSettingComponent } from './vakil-setting/vakil-setting.component';
import { VakilContactSupportComponent } from './vakil-contact-support/vakil-contact-support.component';
import { VakilReportAProblemComponent } from './vakil-report-a-problem/vakil-report-a-problem.component';
import { VakilPrivacyAndSecurityHelpComponent } from './vakil-privacy-and-security-help/vakil-privacy-and-security-help.component';
import { VakilSupportRequestComponent } from './vakil-support-request/vakil-support-request.component';
import { ClientSettingComponent } from './client-setting/client-setting.component';
import { VakilVideoPlayComponent } from './vakil-video-play/vakil-video-play.component';
import { VakilTermsAndConditionsComponent } from './vakil-terms-and-conditions/vakil-terms-and-conditions.component';
import { VakilPrivacyPolicyComponent } from './vakil-privacy-policy/vakil-privacy-policy.component';
import { VakilAboutUsComponent } from './vakil-about-us/vakil-about-us.component';
import { ClientWithEnquiryComponent } from './client-with-enquiry/client-with-enquiry.component';
import { VakilTotalCompleteCaseComponent } from './vakil-total-complete-case/vakil-total-complete-case.component';
import { ClientAboutUsComponent } from './client-about-us/client-about-us.component';
import { TotalAdvocateTypeComponent } from './total-advocate-type/total-advocate-type.component';
import { NewClientRegComponent } from './new-client-reg/new-client-reg.component';
import { AdvocateFilterComponent } from './advocate-filter/advocate-filter.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'aboutcase', component: AboutCaseComponent },
      { path: 'advocates', component: AdvocatePageComponent },
      { path: 'advocateportfolio', component: AdvocatePortfolioComponent },
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'vakilprofile', component: VakilProfileComponent },
      { path: 'addclientcase', component: AddClientCaseComponent },
      { path: 'publication', component: PublicationManagementComponent },
      { path: 'imagemanagement', component: ImageBannerManagementComponent },
      { path: 'videomanagement', component: VideoManagementComponent },
      { path: 'ipc', component: IpcPanelComponent },
      { path: 'kanoonlist', component: KanoonListComponent },
      { path: 'talktolawyer', component: TalkToLawyerComponent },
      { path: 'askquestion', component: AskQuestionComponent },
      { path: 'robotchat', component: RobotChatComponent },
      { path: 'vakiltotalcase', component: VakilTotalCaseComponent },
      { path: 'casedocuments', component: CaseDocumentsComponent },
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'vakilreview', component: VakilReviewComponent },
      { path: 'paymenthistory', component: PaymentHistoryComponent },
      { path: 'paymentlock', component: PaymentLockComponent },
      { path: 'upcomingcourtlist', component: UpcomingCourtListComponent },
      { path: 'upcominghearinglist', component: UpcomingCourtHearingListComponent },
      { path: 'recentclient', component: RecentClientListComponent },
      { path: 'addhearingdate', component: AddHearingDateComponent },
      { path: 'todayhearing', component: TodayHearingComponent },
      { path: 'addmembers', component: AddMembersComponent },
      { path: 'uploaddocuments', component: UploadDocumentsComponent },
      { path: 'chatingclient', component: ChatingClientComponent },
      { path: 'chattingvakil', component: ChatingVakilComponent },
      { path: 'changelwayerslist', component: ChangeLawyersListComponent },
      { path: 'ipcdetails', component: IpcDetailsComponent },
      { path: 'clienthearinglist', component: ClientHearingListComponent },
      { path: 'clientaboutcase', component: ClientCaseAboutComponent },
      { path: 'vakilbyclienttotalcase', component: VakilByClientTotalCaseComponent },
      { path: 'achievementadd', component: AchievementAddComponent },
      { path: 'rewardsadd', component: RewardsAddComponent },
      { path: 'videoplay', component: VideoPlayComponent },
      { path: 'reporttotalclient', component: ReportTotalClientComponent },
      { path: 'clientpaymentlist', component: ClientPaymentListComponent },
      { path: 'clientpaymenthistory', component: ClientPaymentHistoryComponent },
      { path: 'clientaddpayment', component: ClientAddVakilPaymentComponent },
      { path: 'clientduepayment', component: ClientDuePaymentComponent },
      { path: 'membershipplanvalidity', component: MembershipPlanValidityComponent },
      { path: 'vakilsetting', component: VakilSettingComponent },
      { path: 'vakilcontactsupport', component: VakilContactSupportComponent },
      { path: 'vakilreportaproblem', component: VakilReportAProblemComponent },
      { path: 'vakilaccountstatus', component: VakilAccountStatusComponent },
      { path: 'vakilsupportandreuest', component: VakilSupportRequestComponent },
      { path: 'vakilprivacyandsecurity', component: VakilPrivacyAndSecurityHelpComponent },
      { path: 'clientsetting', component: ClientSettingComponent },
      { path: 'vakilvideoplay', component: VakilVideoPlayComponent },
      { path: 'vakiltermsandconditions', component: VakilTermsAndConditionsComponent },
      { path: 'vakilprivacypolicy', component: VakilPrivacyPolicyComponent },
      { path: 'vakilaboutus', component: VakilAboutUsComponent },
      { path: 'clientwithenquiry', component: ClientWithEnquiryComponent },
      { path: 'vakiltotalcompletecase', component: VakilTotalCompleteCaseComponent },
      { path: 'clientaboutus', component: ClientAboutUsComponent },
      { path: 'totaladvocatetype', component: TotalAdvocateTypeComponent },
      { path: 'membershipPremium', component: MembershipPremiumComponent },
      { path: 'newclientreg', component: NewClientRegComponent },
      { path: 'advocatefilter', component: AdvocateFilterComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
