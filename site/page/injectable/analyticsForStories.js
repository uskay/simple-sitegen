const Injectable = require('../../../build/injection/Injectable.js');
module.exports = class AnalyticsForStories extends Injectable {
  getHTML() {
    return /* html */`
    <amp-analytics type="gtag" data-credentials="include">
    <script type="application/json">
      {
        "vars": {
          "gtag_id": "UA-174487998-1",
          "config": {
            "UA-174487998-1": {
              "groups": "default"
            }
          }
        },
        "triggers": {
          "storyProgress": {
            "on": "story-page-visible",
            "vars": {
              "event_name": "custom",
              "event_action": "story_progress",
              "event_category": "\${title}",
              "event_label": "\${storyPageId}",
              "send_to": ["UA-174487998-1"]
            }
          },
          "storyEnd": {
            "on": "story-last-page-visible",
            "vars": {
              "event_name": "custom",
              "event_action": "story_complete",
              "event_category": "\${title}",
              "send_to": ["UA-174487998-1"]
            }
          }
        }
      }
    </script>
    </amp-analytics>
    `;
  }
};
