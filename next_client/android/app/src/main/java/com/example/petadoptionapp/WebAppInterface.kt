package com.example.petadoptionapp

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast

class WebAppInterface(private val mContext: Context) {

    // val cookieManager: CookieManager = CookieManager.getInstance()
    val pref = mContext.getSharedPreferences("PREF", 0)
    val editor = pref.edit()

    /** Show a toast from the web page  */
    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun getAppVersion(): String? {
        // val info: PackageInfo = mContext.packageManager.getPackageInfo(mContext.packageName, 0)
        // val version = info.versionName
        // return version
        return ""
    }

    @JavascriptInterface
    fun subscribeCheck(): Boolean {
        val result = pref.getBoolean("subscribeCheck", false)
        return result
    }

    @JavascriptInterface
    fun onLogout() {
        // cookieManager.setCookie("$BASE_WEB_URL", "jwt=;expires=Mon, 17 Oct 2011 10:47:11 UTC");
        // CookieSyncManager.getInstance().sync();
        // val jwt = pref.getString("jwt", "")
        // editor.remove("jwt");
        // editor.commit()
        // unsubscribeFromTopic(jwt);
    }

    @JavascriptInterface
    fun dismissKeyboard(dissmiss: Boolean = true) {
        // if (dissmiss) {
        //     UIUtil.hideKeyboard(mContext as Activity)
        // }
    }

    @JavascriptInterface
    fun getJWT(): String {
        // val jwt = pref.getString("jwt", "")
        // return jwt
        return ""
    }

    @JavascriptInterface
    fun onLogin(jwt: String) {
        // cookieManager.setCookie("$BASE_WEB_URL", "jwt=" + jwt);
        // CookieSyncManager.getInstance().sync();
        // subscribeToTopic(jwt)
        // editor.putString("jwt", jwt)
        // editor.commit()
    }

    @JavascriptInterface
    fun subscribeToTopic(jwt: String) {
//         try {
//             val token = pref.getString("token", "")
// //            val url = "https://apitest.rencar.co.kr/gcm_register"
//             val url = "$BASE_API_URL/v2/fcm/subscribe"
//             var jsonObjReq = JSONObject()
//             jsonObjReq.put("token", token)
//             jsonObjReq.put("package_name", BuildConfig.APPLICATION_ID)
//             val jsonObjectRequest = object : JsonObjectRequest(Request.Method.POST, url, jsonObjReq,
//                     Response.Listener { response ->
//                         editor.putBoolean("subscribeCheck", true)
//                         editor.commit()
//                     },
//                     Response.ErrorListener { error ->
//                         Log.d("VOLLEY", "ASDFASDFDSFSDF")
//                     }
//             ) {
//                 override fun getHeaders(): Map<String, String> {
//                     val headers = HashMap<String, String>()
//                     headers["Content-Type"] = "application/json"
//                     headers["Accept"] = "application/json"
//                     headers["Authorization"] = "JWT $jwt"

//                     return headers
//                 }
//             }
//             VolleySingleton.getInstance(mContext).addToRequestQueue(jsonObjectRequest)

//         } catch (e: Exception) {

//         }
    }

    @JavascriptInterface
    fun saveImage(data: Array<String>, folderName: String): Boolean {

        // val permissionCheck: Int = ContextCompat.checkSelfPermission(mContext, Manifest.permission.WRITE_EXTERNAL_STORAGE)
        // if (permissionCheck != 0) {
        //     return false
        // }

        // val imgArray: Array<String> = data

        // for ((index, value) in imgArray.withIndex()) {
        //     ImageDownload(mContext, folderName).execute(index.toString(), value)
        // }

        return true
    }
}