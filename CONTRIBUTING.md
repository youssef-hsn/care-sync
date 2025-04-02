# Contributing to care-sync

Our goal is to maintain a clean, consistent, and high-quality codebase for our MERN stack application. Whether you're fixing bugs, adding new features, or improving documentation, please follow these guidelines.

---

## 1. Typical Course of Events

1. So you find an issue you are capable of working on, preferably one that helps with the nearest milestone. 
    > if you find an issue that is not yet created, feel free to create one
2. You claim it either by a comment or by assigning it to yourself
    > it is prefered that the issue isn't getting work from other members
3. After claiming the issue, several steps are needed to make sure code is clean and maintainable so:
    1. Checkout to a suitable branch (relevant branch or create a new one)
    2. Start by writing unit tests if there is a need for them
    3. Make the modifications needed for them to all be passed
    4. Commit any documentation if needed
    5. Open a pull request
    > in steps 2 and 4, you can outsource the work to an issue just don't leave them unmentioned.
4. Stay alert to any comments/requests on the PR to make sure it gets merged.


## 2. Branching

To ensure a smooth workflow, follow these branching conventions:

1. **Main Branches**:
    - `main`: The production-ready branch. Only stable and tested code should be merged here.
    - `develop`: The integration branch for ongoing development. All feature branches should be merged here after review.

2. **Feature Branches**:
    - Use the naming convention `feature/<short-description>` for new features.
    - Always branch off from `develop`.

3. **Bugfix Branches**:
    - Use the naming convention `bugfix/<short-description>` for fixing bugs.
    - Branch off from `develop` or `main` depending on where the bug exists.

4. **Hotfix Branches**:
    - Use the naming convention `hotfix/<short-description>` for urgent fixes to production.
    - Branch off from `main` and merge back into both `main` and `develop`.

5. **General Rules**:
    - Keep branch names concise and descriptive.
    - Delete branches after they are merged to keep the repository clean.
    - Regularly pull updates from `develop` or `main` to avoid merge conflicts.

By adhering to these guidelines, we can maintain a well-organized and efficient development process.


## 3. Commiting

A well-written commit message helps others understand the purpose of your changes. Follow these guidelines to write clear and meaningful commit messages:

1. **Structure**:
    - Use the format:
      ```
      <type>: <short description>
      
      <detailed description>
      ```
    - Example:
      ```
      feat: add JWT authentication
      
      Implemented JWT-based authentication for secure user login and session management.
      ```

2. **Types**:
    - `feat`: A new feature. ✨
    - `fix`: A bug fix. 🛠️
    - `docs`: Documentation changes. 📚
    - `style`: Code style changes (formatting, missing semi-colons, etc.). 💅
    - `test`: Adding or updating tests. 🧪
    - `chore`: Maintenance tasks (e.g., updating dependencies). 📦
    > You can suppliment the type by its corresponding emoji for quicker context


3. **Short Description**:
    - Limit to 50 characters.
    - Use the imperative mood (e.g., "Add", "Fix", "Update").

4. **Detailed Description**:
    - Optional but recommended for complex changes.
    - Explain the "why" and "how" of the change.

5. **General Tips**:
    - Write in English.
    - Avoid vague messages like "fix bug" or "update code".
    - Use present tense (e.g., "Fixes issue" instead of "Fixed issue").

By following these guidelines, we ensure that our commit history remains clean, informative, and easy to navigate.

## 4. Issue Creation

Creating well-defined issues helps streamline the development process and ensures that everyone understands the task at hand. Follow these guidelines when creating an issue:

1. **Title**:
    - Use a concise and descriptive title.
    - Example: `Fix login page validation error`.

2. **Description**:
    - Provide a clear and detailed description of the issue.
    - Include relevant context, such as:
      - Steps to reproduce the issue (if applicable).
      - Expected vs. actual behavior.
      - Screenshots or logs (if helpful).
    > This is optional IF you are in a hurry and don't want the issue lost

3. **Labels**:
    - Add appropriate labels to categorize the issue (e.g., `bug`, `enhancement`, `documentation`).
    - This helps prioritize and filter issues effectively.

4. **Assignees**:
    - Assign the issue to yourself or a team member if you plan to work on it.
    - If unsure, leave it unassigned for others to claim.

5. **Milestones**:
    - Link the issue to a relevant milestone if applicable.
    - This helps track progress toward project goals.

6. **Checklist**:
    - If the issue involves multiple tasks, include a checklist to track progress.
    - Example:
      ```markdown
      - [ ] Update login validation logic
      - [ ] Write unit tests
      - [ ] Update documentation
      ```

By creating clear and actionable issues, we can ensure a more efficient and collaborative development process.
