import Component from "@ember/component";
import { ajax } from "discourse/lib/ajax";

export default Component.extend({
  featuredContent: null,

  didInsertElement() {
    this._super(...arguments);

    const categoryId = settings.featured_category;
    const topicId = settings.featured_topic;

    if (categoryId) {
      // Fetch featured category
      ajax(`/c/${categoryId}/show.json`).then((result) => {
        const category = result.category;
        const featuredImage = category.background_url || category.uploaded_logo?.url;

        this.set("featuredContent", {
          type: "category",
          name: category.name,
          description: category.description,
          url: `/c/${categoryId}`,
          image: featuredImage || "/path/to/default/image.jpg", // Fallback if no image is set
        });
      });
    } else if (topicId) {
      // Fetch featured topic
      ajax(`/t/${topicId}.json`).then((result) => {
        const topic = result;
        const featuredImage = topic.image_url || "/path/to/default/image.jpg";

        this.set("featuredContent", {
          type: "topic",
          name: topic.title,
          description: topic.excerpt,
          url: `/t/${topic.id}`,
          image: featuredImage,
        });
      });
    }
  },
});
