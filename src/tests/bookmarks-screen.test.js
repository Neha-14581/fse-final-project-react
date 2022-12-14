/**
 * @file Implement unit tests for dislike screen.
 */
 import React from 'react'
 import {act, create} from "react-test-renderer"
 import Profile from "../components/profile/index"
 import Bookmarks from "../components/bookmarks";
 import MyDislikes from "../components/profile/my-dislikes"
 import {render, screen} from "@testing-library/react";
 import {HashRouter} from "react-router-dom";
 import Tuits from "./react-test-renderer/tuits/tuits";
 
 const MOCKED_TUITS =
     [{tuit: "alice's tuit", postBy: "123", _id: "1231", stats: {bookmarks:11}},
         {tuit: "bob's tuit", postBy: "153", _id: "1253", stats: {bookmarks:121}}];
 
 
 console.error = () => {
 };

 test('renders a list of tuits on the screen', () => {
     let tuitsRender
     act(() => {
         tuitsRender = create(
             <Tuits
                 tuits={MOCKED_TUITS}/>
         )
     })
     const root = tuitsRender.root
     // eslint-disable-next-line testing-library/await-async-query
     const ttrTuits = root.findAllByProps({
         className: 'ttr-tuit'
     })
     expect(ttrTuits.length).toBe(MOCKED_TUITS.length)
     ttrTuits.forEach((ttrTuit, ndx) => {
         // eslint-disable-next-line testing-library/no-node-access
         expect(ttrTuit.props.children).toBe(MOCKED_TUITS[ndx].tuit)
     })
 })
 
