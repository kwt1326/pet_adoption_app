package com.example.petadoptionapp

import android.Manifest

class ConstantClass {
    private val mPermissions = arrayOf(
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.WRITE_EXTERNAL_STORAGE,
        Manifest.permission.CAMERA
    )

    fun getPermissions(): Array<String> {
        return this.mPermissions
    }
}