package com.example.petadoptionapp

import android.content.DialogInterface
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.KeyEvent
import android.webkit.WebView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val webView: WebView = findViewById(R.id.webview);

        val webViewClass = WebViewClass(webView, WebAppInterface(this))
        webViewClass.init()
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

    private fun showToast(msg: String) {
        Toast.makeText(this, "with Pet 앱을 종료하시겠습니까?", Toast.LENGTH_SHORT).show()
    }
}