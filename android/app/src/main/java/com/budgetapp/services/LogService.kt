package com.budgetapp.services

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService
import java.util.concurrent.TimeUnit

class LogService : Service() {

    private lateinit var scheduler: ScheduledExecutorService

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startLog()
        return START_NOT_STICKY
    }

    private fun startLog() {
        scheduler = Executors.newSingleThreadScheduledExecutor()
        scheduler.scheduleWithFixedDelay({
            Log.d("SS","taking screenshot")
        },0, 10, TimeUnit.SECONDS)
    }

    override fun onDestroy() {
        super.onDestroy()
        scheduler.shutdownNow()
    }
}
