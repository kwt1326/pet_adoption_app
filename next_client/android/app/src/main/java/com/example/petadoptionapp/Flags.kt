package com.example.petadoptionapp

enum class Flags(private val num: Int) {
    FILE_REQUEST_CODE(100);

    fun code() = num;
}