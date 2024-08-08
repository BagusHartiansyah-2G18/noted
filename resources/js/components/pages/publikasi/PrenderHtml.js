import React from "react";
export default function renderHtml({html}) {
    const Snippet = React.createClass({
        render: function() {
          return (html);
        }
    });
    return <Snippet></Snippet>
}