package com.example.petadoptionapp

import android.Manifest
import android.annotation.TargetApi
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.webkit.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity

class WebViewClass(
        private val activity: AppCompatActivity,
        private val webView: WebView,
        private val webAppInterface: WebAppInterface
) {
    private var mFilePathCallback: ValueCallback<Array<Uri?>>? = null
    private val mFilePermissions = ConstantClass().getPermissions()

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

    inner class WebViewChromeClientClass: WebChromeClient() {
        @RequiresApi(Build.VERSION_CODES.M)
        @TargetApi(Build.VERSION_CODES.LOLLIPOP)
        override fun onShowFileChooser(
                webView: WebView,
                filePathCallback: ValueCallback<Array<Uri?>>,
                fileChooserParams: FileChooserParams
        ): Boolean {
            if (mFilePathCallback != null) {
                mFilePathCallback!!.onReceiveValue(null)
            }
            mFilePathCallback = filePathCallback

            if (mFilePermissions.all { activity.checkSelfPermission(it) == PackageManager.PERMISSION_GRANTED }) {
                val intent = Intent(Intent.ACTION_GET_CONTENT)
//                intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true) // 파일 다중 선택
                intent.addCategory(Intent.CATEGORY_OPENABLE)
                intent.type = "image/*"

                activity.startActivityForResult(intent, Flags.FILE_REQUEST_CODE.code())
            } else {
                if (mFilePathCallback != null) {
                    mFilePathCallback!!.onReceiveValue(null)
                }
                mFilePathCallback = null
            }
            return true;
        }
    }

    fun init() {
        webView.webViewClient = WebViewClientClass()
        webView.webChromeClient = WebViewChromeClientClass()
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

    fun getFilePaths(): ValueCallback<Array<Uri?>>? {
        return mFilePathCallback;
    }

    fun setFilePaths(values: ValueCallback<Array<Uri?>>?) {
        mFilePathCallback = values
    }
}