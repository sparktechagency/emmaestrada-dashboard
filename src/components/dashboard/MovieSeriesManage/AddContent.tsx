import React, { useState } from 'react';
import { ArrowLeft, Upload, Play, Plus, X, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EpisodeList from './EpisodeList';
import { SeasonsEpisodes } from './SeasonsEpisodes';

const AddContent = () => {
    const navigate = useNavigate();

    type Episode = {
        id: number
        title: string
        duration: string
        thumbnail?: File | null
        videoFile?: File | null
    }

    type Season = {
        id: number
        name: string
        episodes: Episode[]
        isOpen: boolean
    }



    const [formData, setFormData] = useState({
        title: '',
        releaseYear: '',
        ageRating: '',
        contentType: 'Series',
        numberOfSeasons: '1',
        runtime: '',
        overview: '',
        director: '',
        writer: '',
        productionCompany: '',
        genres: [] as string[],
        tags: [] as string[],
        mainCast: [] as string[]
    });

    const [newGenre, setNewGenre] = useState('');
    const [newTag, setNewTag] = useState('');
    const [newCastMember, setNewCastMember] = useState('');
    const [openAddLesson, setOpenAddLesson] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);


    //   const [seasons, setSeasons] = useState([
    //     {
    //       id: "1",
    //       number: 1,
    //       episodes: [
    //         {
    //           id: "1",
    //           title: "",
    //           duration: "",
    //           thumbnail: null,
    //           video: null,
    //           isSaved: false,
    //         },
    //       ],
    //       isExpanded: true,
    //     },
    //   ]);
    // seasons and episodes
    const [seasons, setSeasons] = useState<any[]>([
        {
            id: 1,
            name: "Season 1",
            episodes: [
                {
                    "id": 1,
                    "title": "Introduction to Modern Web Development",
                    "duration": "12:45",
                    "thumbnail": "https://images.unsplash.com/photo-1522199710521-72d69614c702",
                    "videoFile": "https://images.unsplash.com/photo-1518770660439-4636190af475"
                },
                {
                    "id": 2,
                    "title": "Mastering TypeScript Basics",
                    "duration": "08:30",
                    "thumbnail": "https://images.unsplash.com/photo-1517430816045-df4b7de1cd0d",
                    "videoFile": "https://images.unsplash.com/photo-1505238680356-667803448bb6"
                }
            ],
            isOpen: true
        }
    ])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const addGenre = () => {
        if (newGenre.trim() && !formData.genres.includes(newGenre.trim())) {
            setFormData({
                ...formData,
                genres: [...formData.genres, newGenre.trim()]
            });
            setNewGenre('');
        }
    };

    const removeGenre = (genre: string) => {
        setFormData({
            ...formData,
            genres: formData.genres.filter(g => g !== genre)
        });
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()]
            });
            setNewTag('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag)
        });
    };

    const addCastMember = () => {
        if (newCastMember.trim() && !formData.mainCast.includes(newCastMember.trim())) {
            setFormData({
                ...formData,
                mainCast: [...formData.mainCast, newCastMember.trim()]
            });
            setNewCastMember('');
        }
    };

    const removeCastMember = (member: string) => {
        setFormData({
            ...formData,
            mainCast: formData.mainCast.filter(m => m !== member)
        });
    };


    // ---------- Session and Season Add -------------

    // OPEN EDIT MODAL WITH EPISODE DATA
    const handleEditEpisode = (seasonId: number, episodeId: number) => {
        const season = seasons.find((s) => s.id === seasonId);
        if (!season) return;

        const episode = season.episodes.find((e) => e.id === episodeId);
        if (!episode) return;

        setSelectedSeasonId(seasonId);
        setSelectedEpisode(episode);

        // Example: open modal
        //   setIsEpisodeModalOpen(true);
    };

    // DELETE EPISODE
    const deleteEpisode = (seasonId: number, episodeId: number) => {
        setSeasons((prev) =>
            prev.map((s) =>
                s.id === seasonId
                    ? {
                        ...s,
                        episodes: s.episodes.filter((e) => e.id !== episodeId),
                    }
                    : s
            )
        );
    };

    // season handlers
    const addSeason = () => {
        setSeasons(prev => {
            const nextIndex = prev.length + 1
            return [
                ...prev,
                {
                    id: Date.now(),
                    name: `Season ${nextIndex}`,
                    episodes: [],
                    isOpen: true
                }
            ]
        })
    }

    const toggleSeason = (seasonId: number) => {
        setSeasons(prev =>
            prev.map(s =>
                s.id === seasonId
                    ? { ...s, isOpen: !s.isOpen }
                    : s
            )
        )
    }

    const deleteSeason = (seasonId: number) => {
        setSeasons(prev => prev.filter(s => s.id !== seasonId))
    }

    // episode handlers
    const addEpisode = (seasonId: number) => {
        setSeasons(prev =>
            prev.map(season => {
                if (season.id !== seasonId) return season

                const nextEpisodeNumber = season.episodes.length + 1
                const newEpisode: Episode = {
                    id: Date.now(),
                    title: `Episode ${nextEpisodeNumber}`,
                    duration: ""
                }

                return {
                    ...season,
                    episodes: [...season.episodes, newEpisode]
                }
            })
        )
    }

    const handleEpisodeChange = (
        seasonId: number,
        episodeId: number,
        field: keyof Episode,
        value: string
    ) => {
        setSeasons(prev =>
            prev.map(season => {
                if (season.id !== seasonId) return season

                return {
                    ...season,
                    episodes: season.episodes.map((ep: any) =>
                        ep.id === episodeId
                            ? { ...ep, [field]: value }
                            : ep
                    )
                }
            })
        )
    }

    const handleEpisodeFileChange = (
        seasonId: number,
        episodeId: number,
        field: "thumbnail" | "videoFile",
        file: File | null
    ) => {
        setSeasons(prev =>
            prev.map(season => {
                if (season.id !== seasonId) return season

                return {
                    ...season,
                    episodes: season.episodes.map((ep: any) =>
                        ep.id === episodeId
                            ? { ...ep, [field]: file }
                            : ep
                    )
                }
            })
        )
    }



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <div className="min-h-screen  text-white">
            {/* Header */}
            <div className="">
                <div className=" ">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center border-b-2 border-primary px-3 pb-2">
                            <div className="h-6 "></div>
                            <h1 className="text-xl font-semibold">Add New Content</h1>
                        </div>

                        <div className="flex items-center space-x-4 gap-3">
                            <Button
                                variant='contained'
                                sx={{ background: 'white', color: 'black' }}
                                className="flex items-center space-x-2  px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                <span>Draft</span>
                            </Button>
                            <Button
                                variant='contained'
                                sx={{ background: 'var(--color-primary)' }}
                                className="flex items-center space-x-2  text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Publish</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Content Type */}
                    <div className='bg-cardBg px-6 py-4 rounded-lg'>
                        <label className="block text-md font-semibold text-gray-300 mb-2">
                            Content Type
                        </label>
                        <select
                            // value={formData?.contentType}
                            name='contentType'
                            onChange={handleInputChange}
                            className="w-full max-w-md px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white focus:ring-2  focus:border-transparent"
                        >
                            <option value="Series">Series</option>
                            <option value="Movie">Movie</option>
                        </select>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Basic Information */}
                            <div className="bg-cardBg px-6 py-4 rounded-lg">
                                <div className="grid md:grid-cols-2 gap-6 md:mb-5">
                                    <div>
                                        <label className="block text-md font-medium text-gray-300 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter title of the series..."
                                            className="w-full px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md font-medium text-gray-300 mb-2">
                                            Release Year
                                        </label>
                                        <input
                                            type="text"
                                            name="releaseYear"
                                            value={formData.releaseYear}
                                            onChange={handleInputChange}
                                            placeholder="Select year"
                                            className="w-full px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-md font-medium text-gray-300 mb-2">
                                            Age Rating
                                        </label>
                                        <input
                                            type="text"
                                            name="ageRating"
                                            value={formData.ageRating}
                                            onChange={handleInputChange}
                                            placeholder="e.g., PG-13, R, 16+, TV-MA"
                                            className="w-full px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        />
                                    </div>
                                    {formData?.contentType === 'Series' ? (
                                        <div>
                                            <label className="block text-md font-medium text-gray-300 mb-2">
                                                Number of Seasons
                                            </label>
                                            <input
                                                type="number"
                                                name="numberOfSeasons"
                                                value={formData.numberOfSeasons}
                                                onChange={handleInputChange}
                                                min="1"
                                                className="w-full px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            />
                                        </div>
                                    ) :
                                        <div>
                                            <label className="block text-md font-medium text-gray-300 mb-2">
                                                Runtime
                                            </label>
                                            <input
                                                type="number"
                                                name="runtime"
                                                placeholder='e.g: 140 min'
                                                value={formData?.runtime}
                                                onChange={handleInputChange}
                                                min="1"
                                                className="w-full px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            />
                                        </div>}
                                </div>
                            </div>


                            {/* Media Upload */}
                            <div className={`grid ${formData?.contentType === 'Series' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 bg-cardBg px-6 py-4 rounded-lg`}>
                                <div>
                                    <label className="block text-md font-medium text-gray-300 mb-3">
                                        Thumbnail
                                    </label>
                                    <div className="border-2 border-dashed bg-inputBg border-gray-600 rounded-lg p-8 text-center  transition-colors duration-200">
                                        {/* <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" /> */}
                                        <img src="/mediaIcon.png" alt="" className="h-12 w-12 mx-auto mb-4" />
                                        <p className="text-gray-300 font-medium mb-2">Upload Poster Image</p>
                                        <p className="text-gray-500 text-sm">JPG, PNG (Max 5MB)</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-md font-medium text-gray-300 mb-3">
                                        Thumbnail
                                    </label>
                                    <div className="border-2 border-dashed bg-inputBg border-gray-600 rounded-lg p-8 text-center  transition-colors duration-200">
                                        {/* <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" /> */}
                                        <img src="/videoIcon.png" alt="" className="h-12 w-12 mx-auto mb-4" />
                                        <p className="text-gray-300 font-medium mb-2">Upload Poster Image</p>
                                        <p className="text-gray-500 text-sm">JPG, PNG (Max 5MB)</p>
                                    </div>
                                </div>
                                {formData?.contentType === 'Movie' && <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Trailer
                                    </label>
                                    <div className="border-2 border-dashed bg-inputBg border-gray-600 rounded-lg p-8 text-center  transition-colors duration-200">
                                        {/* <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" /> */}
                                        <img src="/filmIcon.png" alt="" className="h-12 w-12 mx-auto mb-4" />
                                        <p className="text-gray-300 font-medium mb-2">Upload Trailer Video</p>
                                        <p className="text-gray-500 text-sm">MP4, MKV (Max 500MB)</p>
                                    </div>
                                </div>}
                            </div>

                            {/* Overview */}
                            <div className='bg-cardBg px-6 py-4 rounded-lg'>
                                <label className="block text-md font-medium text-gray-300 mb-4">
                                    Overview
                                </label>
                                <textarea
                                    name="overview"
                                    value={formData.overview}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder="Enter detailed overview of the content..."
                                    className="w-full px-4 py-3 bg-inputBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                            {/* Seasons & Episodes */}
                            {formData.contentType === "Series" && (
                                <SeasonsEpisodes
                                    seasons={seasons}
                                    onChange={setSeasons}
                                    title="Seasons & Episodes"
                                />
                            )}


                        </div>

                        {/* Right Column - Cast and Crew */}
                        <div className="">
                            <div className=" rounded-lg">
                                <h3 className="text-lg font-semibold bg-primary text-white mb-6 py-3 px-3">Cast and Crew</h3>

                                {/* Director */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Director
                                    </label>
                                    <input
                                        type="text"
                                        name="director"
                                        value={formData.director}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Christopher Nolan"
                                        className="w-full px-4 py-3 bg-cardBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Writer */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Writer
                                    </label>
                                    <input
                                        type="text"
                                        name="writer"
                                        value={formData.writer}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Jonathan Nolan"
                                        className="w-full px-4 py-3 bg-cardBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Production Company */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Production Company
                                    </label>
                                    <input
                                        type="text"
                                        name="productionCompany"
                                        value={formData.productionCompany}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Warner Bros, Netflix"
                                        className="w-full px-4 py-3 bg-cardBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-transparent"
                                    />
                                </div>

                                {/* Genres */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Genres
                                    </label>
                                    <div className="flex space-x-2 mb-3">
                                        <input
                                            type="text"
                                            value={newGenre}
                                            onChange={(e) => setNewGenre(e.target.value)}
                                            placeholder="Select genres..."
                                            className="flex-1 px-4 py-2 bg-cardBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addGenre}
                                            className="bg-primary hover:bg-yellow-700 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.genres.map((genre, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center space-x-1 bg-primary text-black px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                <span>{genre}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeGenre(genre)}
                                                    className="hover:bg-yellow-700 rounded-full p-0.5"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Tags
                                    </label>
                                    <div className="flex space-x-2 mb-3">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            placeholder="Add tag"
                                            className="flex-1 px-4 py-2 bg-cardBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="bg-primary hover:bg-yellow-700 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="hover:bg-gray-500 rounded-full p-0.5"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Cast */}
                                <div className='px-3 py-4 bg-cardBg rounded-xl'>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Main Cast
                                    </label>
                                    <div className="flex space-x-2 mb-3">
                                        <input
                                            type="text"
                                            value={newCastMember}
                                            onChange={(e) => setNewCastMember(e.target.value)}
                                            placeholder="e.g., Robert Downey Jr."
                                            className="flex-1 px-4 py-2 bg-inputBg border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCastMember())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addCastMember}
                                            className="bg-primary hover:bg-yellow-700 text-black p-2 rounded-lg transition-colors duration-200"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-2 bg-inputBg rounded-lg py-3">
                                        {formData?.mainCast?.length > 0 ? formData?.mainCast?.map((member, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between  px-3 py-2 rounded-lg"
                                            >
                                                <span className="text-white">{member}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeCastMember(member)}
                                                    className="text-red-400 hover:text-red-300 transition-colors duration-200 cursor-pointer"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )) :
                                            <p className="text-gray-400 text-center text-sm">
                                                No cast added yet.
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AddContent;


{/* Action Buttons */ }
{/* <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary hover:bg-yellow-700 text-black font-medium rounded-lg transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div> */}