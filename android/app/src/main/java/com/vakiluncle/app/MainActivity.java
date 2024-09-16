package com.vakiluncle.app;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;
import com.ionicframework.capacitor.Checkout;

public class MainActivity extends BridgeActivity {
     @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);


    registerPlugin(Checkout.class);
  }

}
