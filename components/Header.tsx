import React, { Component } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <Button variant="contained" color="primary">
                  <a>Home</a>
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
