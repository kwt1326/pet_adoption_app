package com.example.petadoptionapp

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.AsyncTask
import android.os.Environment
//import android.support.v4.content.FileProvider
import java.io.File
import java.io.FileOutputStream
import java.lang.Exception
import java.net.HttpURLConnection
import java.net.URL
import android.provider.MediaStore
import android.content.ContentValues

class DownloadFile(private val mContext: Context, saveFolder: String) : AsyncTask<String, Void, Void>() {
    private var fileName: String = ""
    private final val SAVE_FOLDER: String = saveFolder

    override fun doInBackground(vararg params: String?): Void? {
        val savePath: String = Environment.getExternalStorageDirectory().absolutePath + SAVE_FOLDER
        val dir: File = File(savePath)

        if (!dir.exists()) {
            dir.mkdirs()
        }
        
        val currentTimestamp = System.currentTimeMillis()

        val fileIndex: String? = params[0]

        fileName = fileIndex + "-" + currentTimestamp.toString()

        val fileUrl: String? = params[1]

        if (File(savePath + "/" + fileName).exists() == false) {
        } else {
        }

        val localPath: String = savePath + "/" + fileName + ".jpg"

        try {
            val imgUrl = URL(fileUrl)
            val conn: HttpURLConnection = imgUrl.openConnection() as HttpURLConnection
            val len: Int = conn.contentLength;

            val tmpByte = ByteArray(len)

            val `is` = conn.inputStream
            val file = File(localPath)

            val fos = FileOutputStream(file)
            var read: Int

            while (true) {
                read = `is`.read(tmpByte)
                if (read <= 0) {
                    break
                }
                fos.write(tmpByte, 0, read) //file 생성
            }
            `is`.close()
            fos.close()
            conn.disconnect()
        } catch (e: Exception) {
            e.printStackTrace();
        }
        return null
    }

    override fun onPostExecute(result: Void?) {
        super.onPostExecute(result)

        val i: Intent = Intent(Intent.ACTION_VIEW)
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        val targetDir: String = Environment.getExternalStorageDirectory().toString() + SAVE_FOLDER
        val file: File = File(targetDir + "/" + fileName + ".jpg")

        // val uri: Uri = FileProvider.getUriForFile(mContext, /*"com.bignerdranch.android.test.fileprovider"*/ "testUrl", file);
        // i.setDataAndType(uri, "image/*")

        val values = ContentValues()
        values.put(MediaStore.Images.Media.DATA,
                file.toString())
        values.put(MediaStore.Images.Media.MIME_TYPE, "image/*")
        mContext.getContentResolver().insert(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
    }
}