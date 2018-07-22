var menu = [
	{
		name: 'Dashboard',
		url: '/admin',
		icon: 'icon-home',
		submenu: ''
	},
	{
		name: 'Posts',
		url: '/admin/posts',
		icon: 'icon-pencil',
		submenu: [
			{
				name: 'All Posts',
				url: '/admin/posts',
				breadcrumb: {
					home: {
						displayName: 'Home',
						url: '/admin'
					}
				}
			},
			{
				name: 'Add New',
				url: '/admin/posts/add',
				breadcrumb: {
					home: {
						displayName: 'Home',
						url: '/admin'
					},
					posts: {
						displayName: 'All Posts',
						url: '/admin/posts'
					}
				}
			},
			{
				name: 'Categories',
				url: '/admin/posts/category',
			},


		]
	},
	{
		name: 'Media',
		url: '/admin/media',
		icon: 'icon-camera',
		submenu: ''
	},
	{
		name: 'Comments',
		url: '/admin/comments',
		icon: 'icon-bubbles',
		submenu: ''
	},
	{
		name: 'Users',
		url: '/admin/users',
		icon: 'icon-users',
		submenu: [
			{
				name: 'All Users',
				url: '/admin/users',
			},
			{
				name: 'Add New',
				url: '/admin/users/add',
			},
			{
				name: 'Your Profile',
				url: '/admin/users/profile',
			},

		]
	},
	{
		name: 'Settings',
		url: '/admin/setting',
		icon: 'icon-settings',
		submenu: [
			{
				name: 'General',
				url: '/admin/setting',
			},
			{
				name: 'Media',
				url: '/admin/setting/media',
			},
			{
				name: 'Permalinks',
				url: '/admin/setting/permalinks',
			},

		]
	},




];

module.exports = menu;