import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SwiperModule } from 'swiper/angular';
import { UserCasePanelComponent } from './user/user-case-panel/user-case-panel.component';
import { ContactPanelComponent } from './user/contact-panel/contact-panel.component';
import { AccountComponent } from './user/account/account.component';
import { AboutCaseComponent } from './home/about-case/about-case.component';
import { AdvocatePageComponent } from './home/advocate-page/advocate-page.component';
import { AdvocatePortfolioComponent } from './home/advocate-portfolio/advocate-portfolio.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchPageComponent } from './home/search-page/search-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VakilHomePageComponent } from './vakil/vakil-home-page/vakil-home-page.component';
import { VakilAccountComponent } from './vakil/vakil-account/vakil-account.component';
import { VakilProfileComponent } from './home/vakil-profile/vakil-profile.component';
import { VakilContactPanelComponent } from './vakil/vakil-contact-panel/vakil-contact-panel.component';
import { VakilDashboardComponent } from './vakil/vakil-dashboard/vakil-dashboard.component';
import { AddClientCaseComponent } from './home/add-client-case/add-client-case.component';
import { MembershipManagementComponent } from './home/membership-management/membership-management.component';
import { PublicationManagementComponent } from './home/publication-management/publication-management.component';
import { ImageBannerManagementComponent } from './home/image-banner-management/image-banner-management.component';
import { VideoManagementComponent } from './home/video-management/video-management.component';
import { IpcPanelComponent } from './home/ipc-panel/ipc-panel.component';
import { KanoonListComponent } from './home/kanoon-list/kanoon-list.component';
import { NewClientRegComponent } from './home/new-client-reg/new-client-reg.component';
import { TalkToLawyerComponent } from './home/talk-to-lawyer/talk-to-lawyer.component';
import { AskQuestionComponent } from './home/ask-question/ask-question.component';
import { RobotChatComponent } from './home/robot-chat/robot-chat.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VakilTotalCaseComponent } from './home/vakil-total-case/vakil-total-case.component';
import { CaseDocumentsComponent } from './home/case-documents/case-documents.component';
import { VakilReviewComponent } from './home/vakil-review/vakil-review.component';
import { VakilRegistrationComponent } from './vakil-registration/vakil-registration.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { MembershipPremiumComponent } from './home/membership-premium/membership-premium.component';
import { PaymentHistoryComponent } from './home/payment-history/payment-history.component';
import { PaymentLockComponent } from './payment-lock/payment-lock.component';
import { UpcomingCourtListComponent } from './home/upcoming-court-list/upcoming-court-list.component';
import { UpcomingCourtHearingListComponent } from './home/upcoming-court-hearing-list/upcoming-court-hearing-list.component';
import { RecentClientListComponent } from './home/recent-client-list/recent-client-list.component';
import { AddHearingDateComponent } from './home/add-hearing-date/add-hearing-date.component';
import { TotalClientComponent } from './home/total-client/total-client.component';
import { TodayHearingComponent } from './home/today-hearing/today-hearing.component';
import { AddMembersComponent } from './home/add-members/add-members.component';
import { UploadDocumentsComponent } from './home/upload-documents/upload-documents.component';
import { ChatingClientComponent } from './home/chating-client/chating-client.component';
import { ChatingVakilComponent } from './home/chating-vakil/chating-vakil.component';
import { ChangeLawyersListComponent } from './home/change-lawyers-list/change-lawyers-list.component';
import { IpcDetailsComponent } from './home/ipc-details/ipc-details.component';
import { ClientHearingListComponent } from './home/client-hearing-list/client-hearing-list.component';
import { ClientCaseAboutComponent } from './home/client-case-about/client-case-about.component';
import { VakilByClientTotalCaseComponent } from './home/vakil-by-client-total-case/vakil-by-client-total-case.component';
import { AchievementAddComponent } from './home/achievement-add/achievement-add.component';
import { RewardsAddComponent } from './home/rewards-add/rewards-add.component';
import { VideoPlayComponent } from './home/video-play/video-play.component';
import { ReportTotalClientComponent } from './home/report-total-client/report-total-client.component';
import { ClientPaymentListComponent } from './home/client-payment-list/client-payment-list.component';
import { ClientPaymentHistoryComponent } from './home/client-payment-history/client-payment-history.component';
import { ClientAddVakilPaymentComponent } from './home/client-add-vakil-payment/client-add-vakil-payment.component';
import { ClientDuePaymentComponent } from './home/client-due-payment/client-due-payment.component';
import { MembershipPlanValidityComponent } from './home/membership-plan-validity/membership-plan-validity.component';
import { UserChangePasswordComponent } from './user/user-change-password/user-change-password.component';
import { VakilChangePasswordComponent } from './vakil/vakil-change-password/vakil-change-password.component';
import { VakilAccountStatusComponent } from './home/vakil-account-status/vakil-account-status.component';
import { VakilSettingComponent } from './home/vakil-setting/vakil-setting.component';
import { ClientSettingComponent } from './home/client-setting/client-setting.component';
import { VakilVideoPlayComponent } from './home/vakil-video-play/vakil-video-play.component';
import { VakilContactSupportComponent } from './home/vakil-contact-support/vakil-contact-support.component';
import { VakilReportAProblemComponent } from './home/vakil-report-a-problem/vakil-report-a-problem.component';
import { VakilSupportRequestComponent } from './home/vakil-support-request/vakil-support-request.component';
import { VakilPrivacyAndSecurityHelpComponent } from './home/vakil-privacy-and-security-help/vakil-privacy-and-security-help.component';
import { VakilTermsAndConditionsComponent } from './home/vakil-terms-and-conditions/vakil-terms-and-conditions.component';
import { VakilPrivacyPolicyComponent } from './home/vakil-privacy-policy/vakil-privacy-policy.component';
import { VakilAboutUsComponent } from './home/vakil-about-us/vakil-about-us.component';
import { ClientWithEnquiryComponent } from './home/client-with-enquiry/client-with-enquiry.component';
import { VakilTotalCompleteCaseComponent } from './home/vakil-total-complete-case/vakil-total-complete-case.component';
import { ClientAboutUsComponent } from './home/client-about-us/client-about-us.component';
import { TotalAdvocateTypeComponent } from './home/total-advocate-type/total-advocate-type.component';
import { VakilEnquiryCompletedComponent } from './home/vakil-enquiry-completed/vakil-enquiry-completed.component';
import { VakilEnquiryPendingComponent } from './home/vakil-enquiry-pending/vakil-enquiry-pending.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    DashboardComponent,
    UserCasePanelComponent,
    ContactPanelComponent,
    AccountComponent,
    AboutCaseComponent,
    AdvocatePageComponent,
    AdvocatePortfolioComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    SignUpComponent,
    SearchPageComponent,
    VakilHomePageComponent,
    VakilAccountComponent,
    VakilProfileComponent,
    VakilContactPanelComponent,
    VakilDashboardComponent,
    AddClientCaseComponent,
    MembershipManagementComponent,
    PublicationManagementComponent,
    ImageBannerManagementComponent,
    VideoManagementComponent,
    IpcPanelComponent,
    KanoonListComponent,
    NewClientRegComponent,
    TalkToLawyerComponent,
    AskQuestionComponent,
    RobotChatComponent,
    VakilTotalCaseComponent,
    CaseDocumentsComponent,
    VakilReviewComponent,
    VakilRegistrationComponent,
    MembershipPremiumComponent,
    PaymentHistoryComponent,
    PaymentLockComponent,
    UpcomingCourtListComponent,
    UpcomingCourtHearingListComponent,
    RecentClientListComponent,
    AddHearingDateComponent,
    TotalClientComponent,
    TodayHearingComponent,
    AddMembersComponent,
    UploadDocumentsComponent,
    ChatingClientComponent,
    ChatingVakilComponent,
    ChangeLawyersListComponent,
    IpcDetailsComponent,
    ClientHearingListComponent,
    ClientCaseAboutComponent,
    VakilByClientTotalCaseComponent,
    RewardsAddComponent,
    AchievementAddComponent,
    VideoPlayComponent,
    ReportTotalClientComponent,
    ClientPaymentListComponent,
    ClientPaymentHistoryComponent,
    ClientAddVakilPaymentComponent,
    ClientDuePaymentComponent,
    MembershipPlanValidityComponent,
    UserChangePasswordComponent,
    VakilChangePasswordComponent,
    VakilAccountStatusComponent,
    VakilSettingComponent,
    ClientSettingComponent,
    VakilVideoPlayComponent,
    VakilContactSupportComponent,
    VakilReportAProblemComponent,
    VakilSupportRequestComponent,
    VakilPrivacyAndSecurityHelpComponent,
    VakilTermsAndConditionsComponent,
    VakilPrivacyPolicyComponent,
    VakilAboutUsComponent,
    ClientWithEnquiryComponent,
    VakilTotalCompleteCaseComponent,
    ClientAboutUsComponent,
    TotalAdvocateTypeComponent,
    VakilEnquiryCompletedComponent,
    VakilEnquiryPendingComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }