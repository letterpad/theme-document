import React, { Component } from "react";
import PropTypes from "prop-types";
import Article from "../components/Post/Article";
import Loader from "../components/Loader";
import SEO from "client/helpers/SEO";
import OhSnap from "client/helpers/OhSnap";
import AdjacentPostsData from "shared/data-connectors/AdjacentPostsData";
import SinglePostData from "shared/data-connectors/SinglePostData";

class SinglePost extends Component {
  render() {
    if (this.props.loading || this.props.adjPostsLoading) {
      return <Loader />;
    }
    if (this.props.post === null) {
      return (
        <OhSnap message="Sorry, this page does not exist or might be restricted." />
      );
    }
    const tags = [],
      categories = [];
    this.props.post.taxonomies.forEach(taxonomy => {
      if (taxonomy.type === "post_category") {
        categories.push(taxonomy.name);
      } else {
        tags.push(taxonomy.name);
      }
    });

    return (
      <div>
        <SEO
          schema="BlogPosting"
          title={this.props.post.title}
          description={this.props.post.excerpt}
          path={"/post/" + this.props.match.params.slug}
          contentType="article"
          category={categories.join(",")}
          tags={tags}
          image={this.props.post.cover_image}
          settings={this.props.settings || {}}
        />
        <Article
          post={this.props.post}
          adjacentPosts={this.props.adjacentPosts}
        />
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
  adjacentPosts: PropTypes.object,
  adjPostsLoading: PropTypes.bool,
  match: PropTypes.object,
  settings: PropTypes.settings,
};
export default AdjacentPostsData(SinglePostData(SinglePost));
