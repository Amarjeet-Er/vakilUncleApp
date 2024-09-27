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
import { ChatPanelComponent } from './home/chat-panel/chat-panel.component';
import { AccountComponent } from './user/account/account.component';
import { AboutCaseComponent } from './home/about-case/about-case.component';
import { NotificationComponent } from './home/notification/notification.component';
import { AdvocatePageComponent } from './home/advocate-page/advocate-page.component';
import { AdvocatePortfolioComponent } from './home/advocate-portfolio/advocate-portfolio.component';
import { AdvocateCategoryComponent } from './home/advocate-category/advocate-category.component';
import { FilterAdvocateComponent } from './home/filter-advocate/filter-advocate.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchPageComponent } from './home/search-page/search-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CaseHearingComponent } from './home/case-hearing/case-hearing.component';
import { VakilHomePageComponent } from './vakil/vakil-home-page/vakil-home-page.component';
import { VakilAccountComponent } from './vakil/vakil-account/vakil-account.component';
import { VakilProfileComponent } from './home/vakil-profile/vakil-profile.component';
import { VakilContactPanelComponent } from './vakil/vakil-contact-panel/vakil-contact-panel.component';
import { VakilDashboardComponent } from './vakil/vakil-dashboard/vakil-dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AddClientCaseComponent } from './home/add-client-case/add-client-case.component';
import { MembershipManagementComponent } from './home/membership-management/membership-management.component';
import { PublicationManagementComponent } from './home/publication-management/publication-management.component';
import { ImageBannerManagementComponent } from './home/image-banner-management/image-banner-management.component';
import { VideoManagementComponent } from './home/video-management/video-management.component';
import { IpcPanelComponent } from './home/ipc-panel/ipc-panel.component';
import { RtiPanelComponent } from './home/rti-panel/rti-panel.component';
import { ConstitutionPanelComponent } from './home/constitution-panel/constitution-panel.component';
import { IncomeTaxPanelComponent } from './home/income-tax-panel/income-tax-panel.component';
import { BnsPanelComponent } from './home/bns-panel/bns-panel.component';
import { KanoonListComponent } from './home/kanoon-list/kanoon-list.component';
import { NewClientRegComponent } from './home/new-client-reg/new-client-reg.component';
import { TalkToLawyerComponent } from './home/talk-to-lawyer/talk-to-lawyer.component';
import { AskQuestionComponent } from './home/ask-question/ask-question.component';
import { RobotChatComponent } from './home/robot-chat/robot-chat.component';
import { UserAddressComponent } from './home/user-address/user-address.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VakilTotalCaseComponent } from './home/vakil-total-case/vakil-total-case.component';
import { CaseDocumentsComponent } from './home/case-documents/case-documents.component';
import { EnquiryComponent } from './home/enquiry/enquiry.component';
import { VakilReviewComponent } from './home/vakil-review/vakil-review.component';
import { VakilRegistrationComponent } from './vakil-registration/vakil-registration.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { MembershipPremiumComponent } from './home/membership-premium/membership-premium.component';
import { PaymentHistoryComponent } from './home/payment-history/payment-history.component';
import { PaymentLockComponent } from './payment-lock/payment-lock.component';
import { ClientPaymentComponent } from './home/client-payment/client-payment.component';
import { UpcomingCourtListComponent } from './home/upcoming-court-list/upcoming-court-list.component';
import { UpcomingCourtHearingListComponent } from './home/upcoming-court-hearing-list/upcoming-court-hearing-list.component';
import { RecentClientListComponent } from './home/recent-client-list/recent-client-list.component';
import { CompleteCaseListComponent } from './home/complete-case-list/complete-case-list.component';
import { CompleteCaseDetailsComponent } from './home/complete-case-details/complete-case-details.component';
import { AddHearingDateComponent } from './home/add-hearing-date/add-hearing-date.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    DashboardComponent,
    UserCasePanelComponent,
    ContactPanelComponent,
    ChatPanelComponent,
    AccountComponent,
    AboutCaseComponent,
    NotificationComponent,
    AdvocatePageComponent,
    AdvocatePortfolioComponent,
    AdvocateCategoryComponent,
    FilterAdvocateComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    SignUpComponent,
    SearchPageComponent,
    CaseHearingComponent,
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
    RtiPanelComponent,
    ConstitutionPanelComponent,
    IncomeTaxPanelComponent,
    BnsPanelComponent,
    KanoonListComponent,
    NewClientRegComponent,
    TalkToLawyerComponent,
    AskQuestionComponent,
    RobotChatComponent,
    UserAddressComponent,
    VakilTotalCaseComponent,
    CaseDocumentsComponent,
    EnquiryComponent,
    VakilReviewComponent,
    VakilRegistrationComponent,
    MembershipPremiumComponent,
    PaymentHistoryComponent,
    PaymentLockComponent,
    ClientPaymentComponent,
    UpcomingCourtListComponent,
    UpcomingCourtHearingListComponent,
    RecentClientListComponent,
    CompleteCaseListComponent,
    CompleteCaseDetailsComponent,
    AddHearingDateComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    CanvasJSAngularChartsModule,
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
