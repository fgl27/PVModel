package com.fgl27.pvmodel;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.util.Objects;

public class MainActivity extends Activity {
    boolean Created;
    String appUrl = "https://fgl27.github.io/PVModel/page/index.html";
    String offLineAppUrl = "file:///android_asset/page/index.html";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (!Created) {
            setContentView(R.layout.activity_main);
            WebView webView = findViewById(R.id.webview);
            webView.clearCache(true);
            webView.clearHistory();

            WebView.setWebContentsDebuggingEnabled(true);
            WebSettings websettings = webView.getSettings();
            websettings.setJavaScriptEnabled(true);
            websettings.setDomStorageEnabled(true);
            websettings.setAllowFileAccess(true);
            websettings.setAllowContentAccess(true);
            websettings.setAllowFileAccessFromFileURLs(true);
            websettings.setAllowUniversalAccessFromFileURLs(true);
            websettings.setUseWideViewPort(true);
            websettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

            //If isOffline load the app from assets
            //The scripts/shell/page_maker.sh creates
            if (isOffline()) {
                appUrl = offLineAppUrl;
            }
            webView.loadUrl(appUrl);

            webView.setWebViewClient(new WebViewClient() {

                public void onPageFinished(WebView view, String url) {
                    runOnUiThread(() -> findViewById(R.id.loading).setVisibility(View.GONE));
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

                @Override
                public void onReceivedError(WebView view,
                                            int errorCode,
                                            String description, String failingUrl) {
                    CheckURL(failingUrl);
                }

                @TargetApi(Build.VERSION_CODES.M)
                @Override
                public void onReceivedError(WebView view,
                                            WebResourceRequest request,
                                            WebResourceError error) {
                    CheckURL(request.getUrl().toString());
                }

                @TargetApi(Build.VERSION_CODES.M)
                @Override
                public void onReceivedHttpError(WebView view,
                                                WebResourceRequest request,
                                                WebResourceResponse errorResponse) {
                    CheckURL(request.getUrl().toString());
                }

                void CheckURL(String url) {
                    if (Objects.equals(url, appUrl)) {
                        //On load page error load the app from assets
                        //The scripts/shell/page_maker.sh creates
                        appUrl = offLineAppUrl;
                        webView.loadUrl(appUrl);
                    }
                }


            });
            Created = true;
        }
    }

    @Override
    public void onBackPressed() {
        //For some random devices this may crash the app
        try {
            moveTaskToBack(true);
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

    public boolean isOffline() {
        ConnectivityManager cm = (ConnectivityManager) getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return true;
        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();

        return activeNetwork == null || !activeNetwork.isConnected();
    }

}