/**
 * @file Implements Tags component to display a list of tags
 */
import React, {useEffect, useState} from "react";
import './tags.css';
import Tag from "./tag";
import * as tagService from '../../services/tags-service';
import * as authService from "../../services/auth-service";

const Tags = ({tags = [], refreshTags}) => {
    const [profile, setProfile] = useState(undefined);
    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);



    /**
     * Delete tag using API.
     * @param tagID Primary key of tag
     */
    const deleteTag = (tagID) =>
        tagService.deleteTag(tagID)
            .then(refreshTags);

    return (
    <div>
      <ul className="ttr-tags list-group">
        {
          tags.map && tags.map(tag => {
            return (
              <Tag key={tag._id}
                    deleteTag={deleteTag}
                    tag={tag}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tags;