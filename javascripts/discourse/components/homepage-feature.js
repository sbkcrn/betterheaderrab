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

    features.forEach((feature) => {
      if (feature.type === "category" && feature.id) {
        // Fetch category details
        ajax(`/c/${feature.id}/show.json`).then((result) => {
          const category = result.category;
          featuredContent.push({
            type: "category",
            name: category.name,
            description: category.description,
            url: `/c/${feature.id}`,
            image: category.background_url || "/path/to/default/image.jpg",
          });
          this.set("featuredContent", featuredContent);
        });
      } else if (feature.type === "topic" && feature.id) {
        // Fetch topic details
        ajax(`/t/${feature.id}.json`).then((result) => {
          const topic = result;
          featuredContent.push({
            type: "topic",
            name: topic.title,
            description: topic.excerpt,
            url: `/t/${topic.id}`,
            image: topic.image_url || "/path/to/default/image.jpg",
          });
          this.set("featuredContent", featuredContent);
        });
      }
    });
  },
});
