package com.example.petadoptionapp

import android.webkit.WebView
import android.webkit.WebViewClient
import com.example.petadoptionapp.constants.Config

class WebViewClass(private val webView: WebView, private val webAppInterface: WebAppInterface) {
    fun init() {
        webView.webViewClient = WebViewClient()
        webView.settings.javaScriptEnabled = true
        webView.addJavascriptInterface(webAppInterface, "Android")

        webView.loadUrl(Config().LOCAL_WEBVIEW_URI)
    }
}