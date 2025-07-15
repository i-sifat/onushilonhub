@@ .. @@
         {/* Grammar Topics Grid */}
         <Suspense fallback={
           <div className="flex items-center justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
             <span className="ml-2 text-sf-text-subtle">Loading grammar topics...</span>
           
           </div>
         }>
-          <GrammarTopicsGrid level={level as 'hsc' | 'ssc'} topics={topics} />
+          <GrammarTopicsGrid level={level as 'hsc' | 'ssc'} />
         </Suspense>

-        {/* Upload Instructions */}
-        {topics.length === 0 && (
-                    <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
-            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
-              Ready to Add Grammar Topics?
-            </h3>
-            <p className="text-sf-text-subtle mb-4">
-              To populate this section with grammar topics, create topic folders and upload your files:
-            </p>
-            <div className="space-y-2">
-              <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle">
-                /content/grammar-items/{level}/[topic-name]/rules.json
-              </code>
-              <p className="text-sf-text-muted text-sm">
-                Example: <code>/content/grammar-items/{level}/tense/rules.json</code>
-              </p>
-              <p className="text-sf-text-muted text-sm">
-                Example: <code>/content/grammar-items/{level}/voice/rules.json</code>
-              </p>
-            </div>
-            <div className="mt-4 p-4 bg-sf-bg border border-sf-text-muted/20 rounded">
-              <h4 className="font-semibold text-sf-text-bold mb-2">Sample JSON Structure:</h4>
-              <pre className="text-xs text-sf-text-subtle overflow-x-auto">
-{`{
-  "topic": "Tense",
-  "rules": [
-    {
-      "title": "Present Simple Tense",
-      "content": "Used for habitual actions and general truths...",
-      "examples": [
-        "I go to school every day.",
-        "The sun rises in the east."
-      ],
-      "tips": [
-        "Use base form of verb for I, you, we, they",
-        "Add -s/-es for he, she, it"
-      ]
-    }
-  ]
-}`}
-              </pre>
-            </div>
-          </div>
-        )}

         {/* Call to Action */}
         <div className="mt-16 text-center bg-sf-highlight/10 rounded-xl p-8">