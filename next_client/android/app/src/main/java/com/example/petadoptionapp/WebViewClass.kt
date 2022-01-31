package com.example.petadoptionapp

import android.os.Build
import android.webkit.*
import androidx.annotation.RequiresApi

class WebViewClass(private val webView: WebView, private val webAppInterface: WebAppInterface) {
    inner class WebViewClientClass: WebViewClient() {
        @SuppressWarnings("deprecation") // Build.VERSION.SDK_INT <= 24
        override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
            print(url)
            view.loadUrl(url);
            return true;
        }

        @RequiresApi(Build.VERSION_CODES.N) // Build.VERSION.SDK_INT > 24
        override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
            print("test")
            print(request.url)
            view.loadUrl(request.url.toString())
            return true;
        }
    }

    fun init() {
        webView.webViewClient = WebViewClientClass()
        webView.settings.javaScriptEnabled = true
        webView.settings.loadWithOverviewMode = true
        webView.settings.useWideViewPort = true
        webView.settings.builtInZoomControls = false
        webView.settings.displayZoomControls = false
        webView.settings.domStorageEnabled = true
        webView.settings.setSupportMultipleWindows(true)
        webView.settings.setSupportZoom(false)
        webView.setInitialScale(1)
        webView.addJavascriptInterface(webAppInterface, "IAndroid")

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        webView.loadUrl(BuildConfig.WEB_HOST_URI)
    }
}