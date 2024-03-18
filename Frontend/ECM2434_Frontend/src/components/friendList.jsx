import classes from './friendList.module.css';
import React, {useEffect, useState} from 'react';
import ApiClient from "../api/index";

export function FriendList({friends}) {
  
  console.log(friends);
  

  return (
      <>
      <div className={classes.friendList} style={{ borderStyle:'solid', padding:30}}>
       <table>
        <thead>
          <tr>
            <th>Friends</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.username}>
              <td>{friend.username}</td>
            </tr>
          ))}
        </tbody>
       </table>
      </div>
      </>
  );
}