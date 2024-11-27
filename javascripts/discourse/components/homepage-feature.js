import Component from "@ember/component";
import { ajax } from "discourse/lib/ajax";

export default Component.extend({
  featuredContent: null,

  didInsertElement() {
    this._super(...arguments);

    const featuredType = settings.featured_type; // "topic" or "category"
    const featuredId = settings.featured_id;

    if (featuredType === "topic") {
      // Fetch topic details
      ajax(`/t/${featuredId}.json`).then((result) => {
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
    } else if (featuredType === "category") {
      // Fetch category details
      ajax(`/c/${featuredId}/show.json`).then((result) => {
        const category = result.category;
        const featuredImage = category.background_url || category.uploaded_logo?.url;

        this.set("featuredContent", {
          type: "category",
          name: category.name,
          description: category.description,
          url: `/c/${featuredId}`,
          image: featuredImage || "/path/to/default/image.jpg",
        });
      });
    }
  },
});
