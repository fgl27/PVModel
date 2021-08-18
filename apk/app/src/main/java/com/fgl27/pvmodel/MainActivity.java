package com.fgl27.pvmodel;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    boolean Created;
    String appUrl = "https://fgl27.github.io/PVModel/page/index.html";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (!Created) setTheme(R.style.NoActionBar);
        super.onCreate(savedInstanceState);

        if (!Created) {
            setContentView(R.layout.activity_main);
            WebView webView = findViewById(R.id.webview);
            webView.clearCache(true);
            webView.clearHistory();

            WebView.setWebContentsDebuggingEnabled(true);
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setDomStorageEnabled(true);
            webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

            webView.loadUrl(appUrl);

            webView.setWebViewClient(new WebViewClient() {

                public void onPageFinished(WebView view, String url) {
                    runOnUiThread(() -> {
                        ProgressBar loadingView = findViewById(R.id.loading);
                        loadingView.setVisibility(View.GONE);
                    });
                }

                @SuppressWarnings({"deprecation", "RedundantSuppression"})
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    return openPage(url);
                }

                @TargetApi(Build.VERSION_CODES.N)
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    return openPage(request.getUrl().toString());
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

    public boolean openPage(String url) {
        if (url.contains(appUrl)) {
            return false;
        }

        try {//Some device have a browser but don't allow intent to call it

            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));

            if (intent.resolveActivity(getApplicationContext().getPackageManager()) != null) {
                startActivityForResult(intent, 102);
            }

        } catch (Throwable e) {
            Toast.makeText(getApplicationContext(), "Não é possível abrir o link:\n\n" + url, Toast.LENGTH_LONG).show();
        }

        return true;
    }

}