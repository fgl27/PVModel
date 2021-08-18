package com.fgl27.pvmodel;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    boolean Created;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (!Created) setTheme(R.style.NoActionBar);
        super.onCreate(savedInstanceState);

        if (!Created) {
            setContentView(R.layout.activity_main);
            WebView webView = (WebView) findViewById(R.id.webview);
            webView.clearCache(true);
            webView.clearHistory();

            WebView.setWebContentsDebuggingEnabled(true);
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

            webView.loadUrl("https://fgl27.github.io/PVModel/page/index.html");

            webView.setWebViewClient(new WebViewClient() {

                public void onPageFinished(WebView view, String url) {
                    runOnUiThread(() -> {
                        ProgressBar loadingView = findViewById(R.id.loading);
                        loadingView.setVisibility(View.GONE);
                    });
                }
            });
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