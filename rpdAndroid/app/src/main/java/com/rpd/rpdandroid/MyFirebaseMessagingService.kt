package com.rpd.rpdandroid

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.google.firebase.messaging.remoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d("FCM", "From: ${message.from}")

        if(message.data.isNotEmpty()){
            Log.d("FCM", "From: ${message.data}")

        }
        message.notification?.let{
            Log.d("FCM", "Message Body: ${it.body}")
            showNotification(it.title, it.body)
        }


    }
    override fun onNewToken(token: String) {
        Log.d("FCM", "Refreshed token: $token")
        sendRegistrationToServer(token)
    }

    private fun sendRegistrationToServer(token: String?) {
        // Send the token to your server
    }
    private fun showNotification(title: String?, message: String?) {
        val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "fcm_channel_id",
                "FCM Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            notificationManager.createNotificationChannel(channel)
        }

        val notificationBuilder = NotificationCompat.Builder(this, "fcm_channel_id")
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(R.mipmap.ic_rpd)
            .setAutoCancel(true)

        notificationManager.notify(0, notificationBuilder.build())
    }

}