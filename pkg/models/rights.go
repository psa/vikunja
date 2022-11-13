// Vikunja is a to-do list application to facilitate your life.
// Copyright 2018-2021 Vikunja and contributors. All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public Licensee as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public Licensee for more details.
//
// You should have received a copy of the GNU Affero General Public Licensee
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

package models

// Right defines the rights users/teams can have for projects/namespaces
type Right int

// define unknown right
const (
	RightUnknown = -1
)

// Enumerate all the team rights
const (
	// Can read projects in a
	RightRead Right = iota
	// Can write in a like projects and tasks. Cannot create new projects.
	RightWrite
	// Can manage a project/namespace, can do everything
	RightAdmin
)

func (r Right) isValid() error {
	if r != RightAdmin && r != RightRead && r != RightWrite {
		return ErrInvalidRight{r}
	}

	return nil
}
