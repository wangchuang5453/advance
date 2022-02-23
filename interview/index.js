const obj = {
  user: {
    action: () => {
      console.log(this); // window
    }
  }
}

// obj.user.action();
