import Component from "@ember/component";
import { ajax } from "discourse/lib/ajax";

export default Component.extend({
  featuredContent: [],

  didInsertElement() {
    this._super(...arguments);

    const features = [
      { type: settings.featured_1_type, id: settings.featured_1_id },
      { type: settings.featured_2_type, id: settings.featured_2_id },
      { type: settings.featured_3_type, id: settings.featured_3_id },
      { type: settings.featured_4_type, id: settings.featured_4_id },
      { type: settings.featured_5_type, id: settings.featured_5_id },
    ];

    const featuredContent = [];

    features.forEach((feature, index) => {
      if (feature.type === "category" && feature.id) {
        // Fetch category details
        ajax(`/c/${feature.id}/show.json`).then((result) => {
          const category = result.category;
          const featuredImage = category.background_url || category.uploaded_logo?.url;

          featuredContent[index] = {
            type: "category",
            name: category.name,
            description: category.description,
            url: `/c/${feature.id}`,
            image: featuredImage || "/path/to/default/image.jpg",
          };

          this.set("featuredContent", featuredContent);
        });
      } else if (feature.type === "topic" && feature.id) {
        // Fetch topic details
        ajax(`/t/${feature.id}.json`).then((result) => {
          const topic = result;
          const featuredImage = topic.image_url || "/path/to/default/image.jpg";

          featuredContent[index] = {
            type: "topic",
            name: topic.title,
            description: topic.excerpt,
            url: `/t/${topic.id}`,
            image: featuredImage,
          };

          this.set("featuredContent", featuredContent);
        });
      }
    });
  },
});
