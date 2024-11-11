package com.rpd.rpdandroid.ui.dashboard

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.*
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.rpd.rpdandroid.databinding.FragmentDashboardBinding

class DashboardFragment : Fragment() {

    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!
    private val TAG = "DashboardFragment"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val dashboardViewModel =
            ViewModelProvider(this).get(DashboardViewModel::class.java)

        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val webView: WebView = binding.webView
        setupWebView(webView)

        // Load the URL that contains insecure content
        webView.loadUrl("https://rpd-app.vercel.app/chat")

        return root
    }

    private fun setupWebView(webView: WebView) {
        webView.settings.apply {
            javaScriptEnabled = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            domStorageEnabled = true  // Enable DOM storage
            allowFileAccess = true
            allowContentAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
        }

        // Enable remote debugging
        WebView.setWebContentsDebuggingEnabled(true)

        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                Log.d(TAG, "Page started loading: $url")
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d(TAG, "Page finished loading: $url")

                // Inject JavaScript to check page content
                webView.evaluateJavascript(
                    "(function() { return document.documentElement.outerHTML; })();",
                ) { html ->
                    Log.d(TAG, "Page HTML: $html")
                }
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                val errorMessage = "Error loading ${request?.url}: ${error?.description}"
                Log.e(TAG, errorMessage)
                Toast.makeText(requireContext(), errorMessage, Toast.LENGTH_LONG).show()
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                Log.d(TAG, "Loading URL: ${request?.url}")
                return false
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest?) {
                request?.grant(request.resources)
            }

            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                Log.d(TAG, "Console: ${consoleMessage?.message()}")
                return true
            }

            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                Log.d(TAG, "Loading progress: $newProgress%")
            }
        }

        webView.fitsSystemWindows = true
        webView.requestFocus()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}