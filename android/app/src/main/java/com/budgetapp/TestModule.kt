package com.budgetapp
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.PixelFormat
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Environment
import android.util.Log
import com.budgetapp.activities.ScreenShotActivity
import com.budgetapp.services.LogService
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class TestModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "TestModule"

    @ReactMethod
    fun TestModuleEvent(name: String, location: String, callback: Callback) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")
        val response = "response"
        callback.invoke(response)
    }

    @ReactMethod
    fun takeScreenshot(promise: Promise) {
        val intent = Intent(reactApplicationContext, ScreenShotActivity::class.java)
        reactApplicationContext.startActivity(intent)
        promise.resolve("ss taken")
    }

    companion object {
        private const val REQUEST_CODE_SCREEN_CAPTURE = 101
    }

    @ReactMethod
    fun startLog(promise: Promise) {
        val intent = Intent(reactApplicationContext, LogService::class.java)
        reactApplicationContext.startService(intent)
        promise.resolve("Screenshot taken")
    }

}
