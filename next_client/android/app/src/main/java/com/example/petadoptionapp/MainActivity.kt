package com.example.petadoptionapp

import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.KeyEvent
import android.webkit.WebView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AlertDialog
import androidx.core.app.ActivityCompat
import java.lang.Exception

class MainActivity : AppCompatActivity() {
    private var mWebView: WebView? = null
    private var mWebViewClass: WebViewClass? = null

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        this.checkPermissions()

        mWebView = findViewById(R.id.webview);

        if (mWebView != null) {
            mWebViewClass = WebViewClass(this, mWebView!!, WebAppInterface(this, mWebView!!))
            mWebViewClass?.init()
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        val webView: WebView = findViewById(R.id.webview);

        // Check if the key event was the Back button and if there's history
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            if (!webView.canGoBack()) {
                AlertDialog.Builder(this)
                    .setMessage("With Pet 앱을 종료하시겠습니까?")
                    .setPositiveButton(
                        android.R.string.yes
                    ) { dialog, whichButton -> // 확인시 처리 로직
                        showToast("with Pet 앱이 성공적으로 종료되었습니다.")
//                    getLocalStore().clearTokenValues()
//                    startActivity(intent5)
                    }
                    .setNegativeButton(
                        android.R.string.no
                    ) { dialog, whichButton -> }
                    .show()
            }

            if (webView.canGoBack()) {
                webView.goBack()
            }
            return true
        }

        // If it wasn't the Back key or there's no web page history, bubble up to the default
        // system behavior (probably exit the activity)
        return super.onKeyDown(keyCode, event)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == Flags.FILE_REQUEST_CODE.code() && resultCode == Activity.RESULT_OK) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                var mResult: Array<Uri?>? = null
                try {
                    if (data != null) {
                        val dataString = data.dataString // 단일 파일 선택 시 사용
                        val clipData = data.clipData // 다중 파일 선택 시 사용

                        if (dataString != null) {
                            mResult = arrayOf(Uri.parse(dataString))
                        }
                    }
                    mWebViewClass?.getFilePaths()?.onReceiveValue(mResult)
                    mWebViewClass?.setFilePaths(null)
                } catch (e: Exception) {
                    Log.i("File", e.toString())
                    showToast("파일 업로드 실패")
                }
            }
        } else {
            mWebViewClass?.getFilePaths()?.onReceiveValue(null)
            mWebViewClass?.setFilePaths(null)
        }
    }

    override fun onRequestPermissionsResult(
            requestCode: Int,
            permissions: Array<String>,
            results: IntArray
    ) {
        when (requestCode) {
            Flags.FILE_REQUEST_CODE.code() -> {
                if(results.isNotEmpty()) {
                    for((i, permission) in permissions.withIndex()) {
                        if(results[i] != PackageManager.PERMISSION_GRANTED) {
                            Log.i("TAG", "The user has denied to $permission")
                        }
                    }
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.M)
    private fun checkPermissions() {
        val permissions = ConstantClass().getPermissions()
        var rejected = ArrayList<String>()

        for (permission in permissions) {
            if(checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
                rejected.add(permission)
            }
        }

        if(rejected.isNotEmpty()){
            val array = arrayOfNulls<String>(rejected.size)
            ActivityCompat.requestPermissions(this, rejected.toArray(array), Flags.FILE_REQUEST_CODE.code())
        }
    }

    private fun showToast(msg: String) {
        Toast.makeText(this, "with Pet 앱을 종료하시겠습니까?", Toast.LENGTH_SHORT).show()
    }
}