import Profile from "../models/Profile";

export default {
  render(profile: Profile) {
    return {
      id: profile.id,
      level: profile.level,
      xp: profile.xp,
      tasks_completed: profile.tasks_completed,
      user_id: profile.user_id,
    };
  },

  renderMany(profiles: Profile[]) {
    return profiles.map(profile => this.render(profile));
  }
}