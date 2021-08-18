package com.fgl27.pvmodel;

import android.annotation.SuppressLint;
import android.graphics.Color;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
boolean Created;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (!Created) setTheme(R.style.NoActionBar);
        super.onCreate(savedInstanceState);

        if(!Created) {
            setContentView(R.layout.activity_main);
            WebView webView = (WebView) findViewById(R.id.webview);
            webView.setBackgroundColor(Color.TRANSPARENT);

            WebView.setWebContentsDebuggingEnabled(true);
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);

            webView.loadUrl("https://fgl27.github.io/PVModel/page/index.html");
            Created = true;
        }
    }

    @Override
    public void onBackPressed() {
        //For some random devices this may crash the app
        try {
            this.moveTaskToBack(true);
        } catch (Exception ignore) {
        }
    }

}